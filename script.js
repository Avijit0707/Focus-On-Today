const checkBoxList = document.querySelectorAll('.custom-checkbox')
const inputFields = document.querySelectorAll('.input-box')
const errorLabel = document.querySelector('.alert')
const progressBar = document.querySelector('.progress-bar')
const progressValue = document.querySelector('.progress-value')
const firstMessage=document.querySelector('.tag-line')
const allMessage=[
    'Raise the by completing your goals!',
    'Well begun is half done!',
    'Just a step away, keep going!',
    'Congratulation your all goal completed!',
]

const allGoals=JSON.parse( localStorage.getItem("allGoals"))||{}

let completedGoal = Object.values(allGoals).filter((goal)=> goal.isCompleted).length
progressValue.style.width = `${100/ inputFields.length*completedGoal}%`
progressValue.firstElementChild.innerText=`${completedGoal}/${inputFields.length} Completed`
firstMessage.innerText=allMessage[completedGoal]

checkBoxList.forEach((checkbox) => {
  checkbox.addEventListener('click', (e) => {
    const allGoalsAdded = [...inputFields].every(function (input) {
      return input.value
    })

    if (allGoalsAdded) {
      checkbox.parentElement.classList.toggle('completed')
      let inputId = checkbox.nextElementSibling.id
      allGoals[inputId].isCompleted=!allGoals[inputId].isCompleted
      completedGoal = Object.values(allGoals).filter((goal)=> goal.isCompleted).length
      progressValue.style.width = `${100/ inputFields.length*completedGoal}%`
      progressValue.firstElementChild.innerText=`${completedGoal}/${inputFields.length} Completed`
      firstMessage.innerText=allMessage[completedGoal]

      localStorage.setItem('allGoals',JSON.stringify(allGoals))


    } else {
        errorLabel.classList.add('alert-click')
    }
  })
})

inputFields.forEach((input) => {
    input.addEventListener('focus', () => {
        errorLabel.classList.remove('alert-click')
    })
    input.addEventListener('input', (e) => {
        if(allGoals[input.id]){
        //completed thakle type korte debena 
        if(allGoals[input.id].isCompleted){
            input.value=allGoals[input.id].name
            return
        }
        allGoals[input.id].name=input.value
        localStorage.setItem("allGoals",JSON.stringify(allGoals))
    } 
    else{
        allGoals[input.id]={
            name:'',
            isCompleted:false,
        }
        localStorage.setItem("allGoals",JSON.stringify(allGoals))
    }
    })
    if(allGoals[input.id]){
        input.value=allGoals[input.id].name

        if(allGoals[input.id].isCompleted){
            input.parentElement.classList.add('completed')
        }
    }
    
    
   
})

