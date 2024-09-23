import { Component, OnInit } from '@angular/core';
import { ButtonActiveComponent } from '../../ui/buttons/button-active/button-active.component';
import { CardComponent } from './components/card/card.component';
import { TableComponent } from './components/table/table.component';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { PerformanceDetailsService } from '../../service/performance-details/performance-details.service';
import { PerformanceDetails } from '../../shared/models/performanceDetails.interface';
import * as XLSX from 'xlsx';
import { ProgressBarModule } from 'primeng/progressbar';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { CheckboxModule } from 'primeng/checkbox';
import { EmailService } from '../../service/email/email.service';
import { FormsModule } from '@angular/forms';
import { performanceTemplate } from '../../shared/constants/emailTemplate';
import { adminMailTemplate } from '../../shared/constants/emailTemplate';

interface Trainee {
  traineeName: string;
  isPresent: string;
  score: number;
}

@Component({
  selector: 'app-assessment-performance',
  standalone: true,
  imports: [ButtonActiveComponent,
    CardComponent,
    TableComponent,
    SidebarComponent,
    CommonModule,
    ProgressBarModule,DialogModule, ButtonModule,
    TableModule,CheckboxModule,FormsModule],
  templateUrl: './assessment-performance.component.html',
  styleUrl: './assessment-performance.component.scss'
})
export class AssessmentPerformanceComponent implements OnInit {
  name1: string = 'Total Trainees';
  name2: string = 'Attended';
  name3: string = 'Absentees';
  name4: string = 'Maximum Score';
  name5: string = 'Scheduled Date';
  scheduledAssessmentId!: number;
 

  trainees!: Trainee[];
  originalProducts!: Trainee[];
  selectedTrainees!: Trainee[];

  performanceData!: {maximumScore: string, totalTrainees: string, traineesAttended: string, absentees: string, assessmentDate: Date, assessmentName: string, batchName: string};

  isLoading: boolean = true; // Loading state
  visible: boolean = false;
  shareWithAdmin: boolean = false; 
  adminMail: string='';

  constructor(private route: ActivatedRoute, private performanceService: PerformanceDetailsService,private emailService: EmailService) {}

  ngOnInit() {
    localStorage.setItem("adminMail", "aswin.pt@experionglobal.com");
    this.adminMail = localStorage.getItem("adminMail")||'{}';

    this.route.paramMap.subscribe(params => {
      const paramId = params.get('scheduledAssessmentId');
      this.scheduledAssessmentId = paramId ? +paramId : 0; 
      this.fetchPerformanceData(this.scheduledAssessmentId);
      this.fetchTraineesData(this.scheduledAssessmentId);
    });
  }

  onSearch(event: any) {
    const searchTerm = event.target.value.toLowerCase();
    if (searchTerm) {
      this.trainees = this.originalProducts.filter(trainee =>
        trainee.traineeName.toLowerCase().includes(searchTerm)
      );
    } else {
      this.trainees = [...this.originalProducts];
    }
  }

  fetchPerformanceData(scheduledAssessmentId: number) {
    this.performanceService.getPerformanceDetails(scheduledAssessmentId).subscribe((data: PerformanceDetails) => {
      this.performanceData = {
        maximumScore: data.maximumScore.toString(),
        totalTrainees: data.totalTrainees.toString(),
        traineesAttended: data.traineesAttended.toString(),
        absentees: data.absentees.toString(),
        assessmentDate: new Date(data.assessmentDate),
        assessmentName: data.assessmentName.toString(),
        batchName: data.batchName.toString()
      };
      this.isLoading = false; // Data is loaded, stop loading
      console.log('Performance Data JSON:', this.performanceData);
    });
  }

  fetchTraineesData(assessmentId:number) {
    this.performanceService.getTrainees(assessmentId).subscribe(
      (data: Trainee[]) => {
        this.trainees = data;
        this.originalProducts = [...this.trainees];
        console.log(this.originalProducts);
      },
      error => {
        console.error('Error fetching trainees data', error);
        this.isLoading = false; // Even if there's an error, stop loading
      }
    );
  }

  getFormattedDate(date: Date | null): string {
    return date ? date.toLocaleDateString('en-GB') : ''; 
  }

  
  exportToExcel(sendEmail: boolean) {
    const workbook = XLSX.utils.book_new();

    const performanceRow = [
      ['Assessment Name', this.performanceData.assessmentName],
      ['Batch Name', this.performanceData.batchName],
      ['Scheduled Date', this.getFormattedDate(this.performanceData.assessmentDate)],
      ['Maximum Score', this.performanceData.maximumScore],
      ['Total Trainees', this.performanceData.totalTrainees],
      ['Trainees Attended', this.performanceData.traineesAttended],
      ['Absentees', this.performanceData.absentees],
    ];

    const worksheet = XLSX.utils.aoa_to_sheet(performanceRow);
    XLSX.utils.sheet_add_aoa(worksheet, [[]], { origin: -1 });
    XLSX.utils.sheet_add_json(worksheet, this.originalProducts, { origin: 'A10', skipHeader: false });
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Performance Data');

    if(sendEmail){
      return workbook;
    }
    else{
      XLSX.writeFile(workbook, 'assessment_performance.xlsx');
      return;
    }
  }

  showDialog() {
    this.visible = true;  
  }

  async sendMail() {
    try {
      
      const emailTemplate = performanceTemplate;
      const adminTemplate = adminMailTemplate;

      if (this.selectedTrainees && this.selectedTrainees.length > 0) {
        const emailRequests = await Promise.all(
          this.selectedTrainees.map(async (trainee: Trainee) => {
            try {
              const userDetails = await this.emailService.getUserEmailByUsername(trainee.traineeName).toPromise();
              const emailBody = this.generateEmailBody(emailTemplate, {
                traineeName: trainee.traineeName,
                score: trainee.score.toString(),
                assessmentName: this.performanceData.assessmentName
              });
              console.log(emailBody);
              
              return {
                toEmail: userDetails.email,
                subject: 'Assessment Performance',
                body: emailBody
              };
            
            } catch (error) {
              console.error('Error fetching user email', error);
              throw error;
            }
          })
        );

        for (const request of emailRequests) {
          try {
            await this.emailService.sendEmail(request).toPromise();
            console.log('Email sent successfully to', request.toEmail);
          } catch (error) {
            console.error('Error sending email to', request.toEmail, error);
          }
        }
      }

      if (this.shareWithAdmin) {
        // Generate the Excel file and convert to Blob
        const workbook = this.exportToExcel(true) as XLSX.WorkBook;
      
        
        const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
        const adminEmailBlob = new Blob([excelBuffer], { type: 'application/octet-stream' });
        
        const base64Excel = await this.convertBlobToBase64(adminEmailBlob);
        
        const adminEmailRequest = {
          toEmail: this.adminMail,
          subject: `${this.performanceData.assessmentName} Performance Report`,
          body: this.generateEmailBody(adminTemplate, {
            assessmentName: this.performanceData.assessmentName
          }),
          attachments: [
            {
              fileName: 'assessment_performance.xlsx',
              fileContent: base64Excel
              
            }
          ]
        };

        
        try {
          await this.emailService.sendEmail(adminEmailRequest).toPromise();
          console.log('Admin email sent successfully!');
        } catch (error) {
          console.error('Error sending admin email', error);
        }
      }
    } catch (error) {
      console.error('Error sending mail', error);
    }
  }

  generateEmailBody(template: string, values: { [key: string]: string }): string {
    let emailBody = template;
    Object.keys(values).forEach(key => {
      emailBody = emailBody.replace(new RegExp(`{{${key}}}`, 'g'), values[key]);
    });
    return emailBody;
  }

  convertBlobToBase64(blob: Blob): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64data = reader.result as string;
        resolve(base64data.split(',')[1]); // Extract base64 content
      };
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  }

  filteredData(data: Trainee[]){
    console.log(data);
  }
}
