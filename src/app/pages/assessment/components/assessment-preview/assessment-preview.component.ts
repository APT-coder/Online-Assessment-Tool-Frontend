import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from '../../../../components/sidebar/sidebar.component';
import { ButtonActiveComponent } from '../../../../ui/buttons/button-active/button-active.component';
import { ButtonInactiveComponent } from '../../../../ui/buttons/button-inactive/button-inactive.component';
import { ButtonPointsComponent } from '../../../../ui/buttons/button-points/button-points.component';

interface Question {
  id: string;
  type: string;
  content: string;
  options?: string[];
  correctAnswer: string;
  score: number;
}

interface Assessment {
  id: string;
  name: string;
  scheduledBatchId: string;
  createdDate: string;
  questions: Question[];
}

@Component({
  selector: 'app-assessment-preview',
  standalone: true,
  imports: [SidebarComponent, ButtonActiveComponent, ButtonInactiveComponent, ButtonPointsComponent, CommonModule],
  templateUrl: './assessment-preview.component.html',
  styleUrl: './assessment-preview.component.scss'
})
export class AssessmentPreviewComponent {
    @Input() questions: any;
    @Output() editClicked: EventEmitter<void> = new EventEmitter<void>();

    onEditClicked() {
      this.editClicked.emit();
    }
  isSidebarCollapsed: boolean = false;
    currentAssessment: Assessment | null = null;

    ngOnInit() {
        console.log(this.questions);
        this.fetchAssessmentData();
    }

    onToggleSidebar(collapsed: boolean) {
        this.isSidebarCollapsed = collapsed;
      }

      fetchAssessmentData() {
        const data = {
            "assessments": [
                {
                    "id": "A1",
                    "name": "Midterm Exam",
                    "scheduledBatchId": "B1",
                    "createdDate": "2024-07-06",
                    "questions": [
                        {
                            "id": "q1",
                            "type": "mcq",
                            "content": "What is the capital of Japan?",
                            "options": ["Tokyo", "Osaka", "Kyoto", "Nagoya"],
                            "correctAnswer": "Tokyo",
                            "score": 5
                        },
                        {
                            "id": "q2",
                            "type": "mcq",
                            "content": "What is the chemical symbol for water?",
                            "options": ["H2O", "O2", "CO2", "H2O2"],
                            "correctAnswer": "H2O",
                            "score": 5
                        },
                        {
                            "id": "q3",
                            "type": "descriptive",
                            "content": "Describe the process of photosynthesis.",
                            "correctAnswer": "Photosynthesis is a process used by plants...",
                            "score": 10
                        },
                        {
                            "id": "q4",
                            "type": "fill_up",
                            "content": "The boiling point of water is ____ degrees Celsius.",
                            "correctAnswer": "100",
                            "score": 5
                        },
                        {
                            "id": "q5",
                            "type": "mcq",
                            "content": "Which planet is known as the Earth's twin?",
                            "options": ["Venus", "Mars", "Jupiter", "Saturn"],
                            "correctAnswer": "Venus",
                            "score": 5
                        },
                        {
                            "id": "q6",
                            "type": "mcq",
                            "content": "What is the hardest natural substance on Earth?",
                            "options": ["Gold", "Diamond", "Iron", "Platinum"],
                            "correctAnswer": "Diamond",
                            "score": 5
                        },
                        {
                            "id": "q7",
                            "type": "descriptive",
                            "content": "Explain Newton's first law of motion.",
                            "correctAnswer": "Newton's first law states that an object at rest...",
                            "score": 10
                        },
                        {
                            "id": "q8",
                            "type": "fill_up",
                            "content": "The powerhouse of the cell is the ____.",
                            "correctAnswer": "mitochondria",
                            "score": 5
                        },
                        {
                            "id": "q9",
                            "type": "mcq",
                            "content": "What is the largest ocean on Earth?",
                            "options": ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"],
                            "correctAnswer": "Pacific Ocean",
                            "score": 5
                        },
                        {
                            "id": "q10",
                            "type": "mcq",
                            "content": "What is the freezing point of water?",
                            "options": ["0°C", "32°C", "100°C", "212°C"],
                            "correctAnswer": "0°C",
                            "score": 5
                        }
                    ]
                },
                {
                    "id": "A2",
                    "name": "Final Exam",
                    "scheduledBatchId": "B2",
                    "createdDate": "2024-07-06",
                    "questions": [
                        {
                            "id": "q1",
                            "type": "mcq",
                            "content": "Which element has the atomic number 1?",
                            "options": ["Helium", "Oxygen", "Hydrogen", "Nitrogen"],
                            "correctAnswer": "Hydrogen",
                            "score": 5
                        },
                        {
                            "id": "q2",
                            "type": "mcq",
                            "content": "Who wrote 'Romeo and Juliet'?",
                            "options": ["Charles Dickens", "William Shakespeare", "Mark Twain", "Jane Austen"],
                            "correctAnswer": "William Shakespeare",
                            "score": 5
                        },
                        {
                            "id": "q3",
                            "type": "descriptive",
                            "content": "Discuss the causes of World War I.",
                            "correctAnswer": "World War I was caused by a combination of factors...",
                            "score": 10
                        },
                        {
                            "id": "q4",
                            "type": "fill_up",
                            "content": "The chemical formula for table salt is ____.",
                            "correctAnswer": "NaCl",
                            "score": 5
                        },
                        {
                            "id": "q5",
                            "type": "mcq",
                            "content": "What is the largest mammal in the world?",
                            "options": ["Elephant", "Blue Whale", "Giraffe", "Great White Shark"],
                            "correctAnswer": "Blue Whale",
                            "score": 5
                        },
                        {
                            "id": "q6",
                            "type": "mcq",
                            "content": "What is the main ingredient in guacamole?",
                            "options": ["Tomato", "Onion", "Avocado", "Pepper"],
                            "correctAnswer": "Avocado",
                            "score": 5
                        },
                        {
                            "id": "q7",
                            "type": "descriptive",
                            "content": "Explain the principle of supply and demand.",
                            "correctAnswer": "The principle of supply and demand states that...",
                            "score": 10
                        },
                        {
                            "id": "q8",
                            "type": "fill_up",
                            "content": "Light travels at a speed of approximately ____ kilometers per second.",
                            "correctAnswer": "300,000",
                            "score": 5
                        },
                        {
                            "id": "q9",
                            "type": "mcq",
                            "content": "Which gas do plants absorb from the atmosphere?",
                            "options": ["Oxygen", "Nitrogen", "Carbon Dioxide", "Helium"],
                            "correctAnswer": "Carbon Dioxide",
                            "score": 5
                        },
                        {
                            "id": "q10",
                            "type": "mcq",
                            "content": "Which organ in the human body is primarily responsible for detoxification?",
                            "options": ["Heart", "Kidney", "Liver", "Lung"],
                            "correctAnswer": "Liver",
                            "score": 5
                        }
                    ]
                }
            ]
        };

        this.currentAssessment = data.assessments[0];
    }
}
