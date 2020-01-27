"use strict";

const getElem=q=>document.querySelector(q);
const getElems=q=>document.querySelectorAll(q);

let calci={
darkTheme:true,
operatorSymbols:['+','-','*','/','%','.'],
safeEval:expression=>new Function("return "+expression)(),
};

function getAllDOMElements(){
   /*nodes*/
   calci.output=getElem('#output');
   
   calci.preview=getElem('#preview');
   
   calci.evaluate=getElem('#evaluate');
   
   calci.cancel=getElem('#cancel');
   
   calci.AC=getElem('#AC');
   
   calci.theme= getElem("#theme");
	
   /*nodelists*/
   calci.digits=getElems('.digit');
   
   calci.operators=getElems('.operator');
   
   calci.brace=getElems('.brace');
	
   
}

/*
function setAllEventListeners():

sets all event attributes to relevant 
function.

Node.addEventListener() could be used
but it's not necessary as only one function 
is to be executed per event.

also onclick is more readable
*/

function setAllEventListeners(){
   calci.evaluate.onclick=()=>
     setResult(calci.output);
   
   calci.cancel.onclick=remove;
   
   calci.AC.onclick=allClear;
	
   calci.theme.onclick=toggleTheme;
	
   for(let _digit of calci.digits)
    _digit.onclick=digitClick;
  
   for(let _operator of calci.operators)
    _operator.onclick=operatorClick;
    
   for(let brace of calci.brace)
     brace.onclick=b=>
     addToOutput(b.target.innerText);
}

/*
function setResult(component)
sets result of evaluated expresson
as value of innerHTML property of
component(DOM element) passed

used to set result for:
1)output
2)preview
*/

function setResult(component){
   let res;
   try{
       let exp=calci.output.innerText;
       
       if(hasOpAtEnd(exp))
        exp=exp.slice(0,-1);
        
       res=calci.safeEval(exp);
       component.innerHTML=
       res===undefined?'&nbsp;':res;
       
   }catch(e){
       component.innerText='Bad Expression!'
   }
}

/*
function addToOutput(str)

concats passed string(str) to innerHTML 
of output
*/

function addToOutput(str){
    calci.output.innerText+=str;
}

/*
function digitClick(e)

e=event

function to be envoked when a digit is clicked
used in function setAllEventListeners()
*/

function digitClick(e){
    const digit=e.target.innerText;
    addToOutput(digit);
}

/*
function hasOpAtEnd(s)

checks whether passed string (s) contains 
an operator at end

used in function operatorClick(e)
*/
function hasOpAtEnd(s){
    let lastChar=s.slice(-1);
    return calci.operatorSymbols.includes(lastChar);
}

/*
function operatorClick(e)

e=event

function to be envoked when an operator 
is clicked used in 
function setAllEventListeners()

uses hasOpAtEnd(s)
if output already has an operator at end 
then remove it and add newly clicked operator

otherwise just add newly clicked operator
*/
function operatorClick(e){
    let op=e.target.innerText;
     if(hasOpAtEnd(output.innerText))
     { 
      output.innerText=
      output.innerText.slice(0,-1);
     }
    addToOutput(op);
}

/*
function remove()
removes a single charecter(operator or digit)
from output string

&nbsp; is to ensure that at least some 
charecters are in innerHTMl/Text so that 
size of element won't get changed
*/

function remove(){
    if(output.innerHTML==='&nbsp;')
      return;
    calci.output.innerText=
    calci.output.innerText.slice(0,-1);
}

/*
function allClear()
removes all visible charecters from string

or say

sets innerHTMl of output to empty space 
*/

function allClear(){
    calci.output.innerHTML='&nbsp;';
}

function toggleTheme(){
	if(calci.darkTheme){
		getElem('html')
		.style["filter"]="invert(1)";
		alert(5)
	}
}

/*
function window onload Anonymous

runs major functions after window 
is loaded setInterval is used to call 
setResult(calci.preview)
after every 200 microseconds

which sets result of expression for 
preview
*/

window.onload=()=>{
   getAllDOMElements();
   setAllEventListeners();
   setInterval(()=>setResult(calci.preview),200);  
}