import { Component } from '@angular/core';
import { ButtonActiveComponent } from '../../../../ui/buttons/button-active/button-active.component';
import { SidebarComponent } from '../../../../components/sidebar/sidebar.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Option {
  optionId: number;
  optionText: string;
}

interface Question {
  id: string;
  type: string;
  content: string;
  options?: string[];
  correctAnswer: string;
  score: number;
  learnerResponse: string;
}

interface Assessment {
  id: string;
  name: string;
  scheduledBatchId: string;
  createdDate: string;
  questions: Question[];
}

  interface Student {
    id: number;
    name: string;
    status: string;
    mark: number | '';
  }

@Component({
  selector: 'app-assessment-evaluate',
  standalone: true,
  imports: [ButtonActiveComponent, SidebarComponent, CommonModule, FormsModule],
  templateUrl: './assessment-evaluate.component.html',
  styleUrl: './assessment-evaluate.component.scss'
})
export class AssessmentEvaluateComponent {
  Title:string="OOPs Assessment"
isSidebarCollapsed: boolean = false;
rate1:string="30/30"

students: Student[] = [
  {
      "id": 1,
      "name": "John Doe",
      "status": "present",
      "mark": 85
  },
  {
      "id": 2,
      "name": "Jane Smith",
      "status": "present",
      "mark": 70
  },
  {
      "id": 3,
      "name": "Michael Johnson",
      "status": "absent",
      "mark": ""
  },
  {
      "id": 4,
      "name": "Emily Davis",
      "status": "present",
      "mark": 75
  },
  {
      "id": 5,
      "name": "David Brown",
      "status": "absent",
      "mark": ""
  },
  {
      "id": 6,
      "name": "Sarah Wilson",
      "status": "present",
      "mark": 80
  },
  {
      "id": 7,
      "name": "Ryan Martinez",
      "status": "absent",
      "mark": ""
  },
  {
      "id": 8,
      "name": "Jessica Lee",
      "status": "present",
      "mark": 72
  },
  {
      "id": 9,
      "name": "Daniel Miller",
      "status": "absent",
      "mark": ""
  },
  {
      "id": 10,
      "name": "Emma Garcia",
      "status": "present",
      "mark": 77
  },
  {
      "id": 11,
      "name": "Matthew Taylor",
      "status": "present",
      "mark": 68
  },
  {
      "id": 12,
      "name": "Olivia Anderson",
      "status": "absent",
      "mark": ""
  },
  {
      "id": 13,
      "name": "Lucas Hernandez",
      "status": "present",
      "mark": 82
  },
  {
      "id": 14,
      "name": "Sophia Garcia",
      "status": "absent",
      "mark": ""
  },
  {
      "id": 15,
      "name": "Alexander Wilson",
      "status": "present",
      "mark": 79
  },
  {
      "id": 16,
      "name": "Isabella Moore",
      "status": "absent",
      "mark": ""
  },
  {
      "id": 17,
      "name": "James Thompson",
      "status": "present",
      "mark": 73
  },
  {
      "id": 18,
      "name": "Mia Robinson",
      "status": "absent",
      "mark": ""
  },
  {
      "id": 19,
      "name": "Benjamin White",
      "status": "present",
      "mark": 76
  },
  {
      "id": 20,
      "name": "Charlotte Hall",
      "status": "absent",
      "mark": ""
  }
];



assessments: Assessment[] = [
        {
            id: "A1",
            name: "Midterm Exam",
            scheduledBatchId: "B1",
            createdDate: "2024-07-06",
            questions: [
                {
                    id: "q1",
                    type: "mcq",
                    content: "What is the capital of Japan?",
                    options: ["Tokyo", "Osaka", "Kyoto", "Nagoya"],
                    correctAnswer: "Tokyo",
                    score: 5,
                    learnerResponse: "Tokyo"
                },
                {
                    id: "q2",
                    type: "mcq",
                    content: "What is the chemical symbol for water?",
                    options: ["H2O", "O2", "CO2", "H2O2"],
                    correctAnswer: "H2O",
                    score: 5,
                    learnerResponse: "O2"
                },
                {
                    id: "q3",
                    type: "descriptive",
                    content: "Describe the process of photosynthesis.",
                    correctAnswer: "Photosynthesis is a process used by plants...",
                    score: 10,
                    learnerResponse: "Photosynthesis is a biochemical process..."
                },
                {
          "id": "q4",
          "type": "fill_up",
          "content": "The boiling point of water is ____ degrees Celsius.",
          "correctAnswer": "100",
          "score": 5,
          "learnerResponse": "120"
        },
        {
          "id": "q5",
          "type": "mcq",
          "content": "Which planet is known as the Earth's twin?",
          "options": ["Venus", "Mars", "Jupiter", "Saturn"],
          "correctAnswer": "Venus",
          "score": 5,
          "learnerResponse": "Venus"
        },
        {
          "id": "q6",
          "type": "mcq",
          "content": "What is the hardest natural substance on Earth?",
          "options": ["Gold", "Diamond", "Iron", "Platinum"],
          "correctAnswer": "Diamond",
          "score": 5,
          "learnerResponse": "Iron"
        },
        {
          "id": "q7",
          "type": "descriptive",
          "content": "Explain Newton's first law of motion.",
          "correctAnswer": "Newton's first law states that an object at rest...",
          "score": 10,
          "learnerResponse": "Newton's First Law of Motion states that an object at rest will remain at rest, and an object in motion will remain in motion at a constant velocity unless acted upon by a net external force. It essentially describes the concept of inertia, where objects resist changes in their state of motion."
        },
        {
          "id": "q8",
          "type": "fill_up",
          "content": "The powerhouse of the cell is the ____.",
          "correctAnswer": "mitochondria",
          "score": 5,
          "learnerResponse": "mitochondria"
        },
        {
          "id": "q9",
          "type": "mcq",
          "content": "What is the largest ocean on Earth?",
          "options": ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"],
          "correctAnswer": "Pacific Ocean",
          "score": 5,
          "learnerResponse": "Indian Ocean"
        },
        {
          "id": "q10",
          "type": "mcq",
          "content": "What is the freezing point of water?",
          "options": ["0°C", "32°C", "100°C", "212°C"],
          "correctAnswer": "0°C",
          "score": 5,
          "learnerResponse": "0°C"
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
          "score": 5,
          "learnerResponse": "Hydrogen"
        },
        {
          "id": "q2",
          "type": "mcq",
          "content": "Who wrote 'Romeo and Juliet'?",
          "options": ["Charles Dickens", "William Shakespeare", "Mark Twain", "Jane Austen"],
          "correctAnswer": "William Shakespeare",
          "score": 5,
          "learnerResponse": "William Shakespeare"
        },
        {
          "id": "q3",
          "type": "descriptive",
          "content": "Discuss the causes of World War I.",
          "correctAnswer": "World War I was caused by a combination of factors...",
          "score": 10,
          "learnerResponse": "World War I, often referred to as the Great War, had complex causes rooted in political, economic, and social factors. "
        },
        {
          "id": "q4",
          "type": "fill_up",
          "content": "The chemical formula for table salt is ____.",
          "correctAnswer": "NaCl",
          "score": 5,
          "learnerResponse": "NaCl"
        },
        {
          "id": "q5",
          "type": "mcq",
          "content": "What is the largest mammal in the world?",
          "options": ["Elephant", "Blue Whale", "Giraffe", "Great White Shark"],
          "correctAnswer": "Blue Whale",
          "score": 5,
          "learnerResponse": "Elephant"
        },
        {
          "id": "q6",
          "type": "mcq",
          "content": "What is the main ingredient in guacamole?",
          "options": ["Tomato", "Onion", "Avocado", "Pepper"],
          "correctAnswer": "Avocado",
          "score": 5,
          "learnerResponse": "Avocado"
        },
        {
          "id": "q7",
          "type": "descriptive",
          "content": "Explain the principle of supply and demand.",
          "correctAnswer": "The principle of supply and demand states that...",
          "score": 10,
          "learnerResponse": "The principle of supply and demand states that..."
        },
        {
          "id": "q8",
          "type": "fill_up",
          "content": "Light travels at a speed of approximately ____ kilometers per second.",
          "correctAnswer": "300,000",
          "score": 5,
          "learnerResponse": "300,000"
        },
        {
          "id": "q9",
          "type": "mcq",
          "content": "Which gas do plants absorb from the atmosphere?",
          "options": ["Oxygen", "Nitrogen", "Carbon Dioxide", "Helium"],
          "correctAnswer": "Carbon Dioxide",
          "score": 5,
          "learnerResponse": "Nitrogen"
        },
        {
          "id": "q10",
          "type": "mcq",
          "content": "Which organ in the human body is primarily responsible for detoxification?",
          "options": ["Heart", "Kidney", "Liver", "Lung"],
          "correctAnswer": "Liver",
          "score": 5,
          "learnerResponse": "Liver"
        }
      ]
    }
  ]


    


  getAbsentStudents(): Student[] {
    return this.students.filter(student => student.status === 'absent');
  }

  getAbsentCount(): number {
    return this.getAbsentStudents().length;
  } 

  onToggleSidebar(collapsed: boolean) {
    this.isSidebarCollapsed = collapsed;
  }
  getIconClass(status: string): string {
    return status === 'present' ? 'fas fa-check-circle' : 'fas fa-times-circle';
  }
}
