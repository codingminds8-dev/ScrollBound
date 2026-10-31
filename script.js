const modal = document.querySelector('.quest-modal');
const openButtons = document.querySelectorAll('[data-open-quest]');
const closeButtons = document.querySelectorAll('[data-close-quest]');
const topicOptions = document.querySelectorAll('.topic-option');
function openQuest(){modal.hidden=false;document.body.classList.add('modal-open');document.querySelector('.topic-option')?.focus()}
function closeQuest(){modal.hidden=true;document.body.classList.remove('modal-open')}
openButtons.forEach((button)=>button.addEventListener('click',openQuest));
closeButtons.forEach((button)=>button.addEventListener('click',closeQuest));
topicOptions.forEach((option)=>option.addEventListener('click',()=>{topicOptions.forEach((item)=>item.classList.remove('selected'));option.classList.add('selected')}));
document.addEventListener('keydown',(event)=>{if(event.key==='Escape'&&!modal.hidden)closeQuest()});
