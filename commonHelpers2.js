import"./assets/styles-f16b1425.js";import{i as n}from"./assets/vendor-77e16229.js";const s=document.querySelector('input[value="fulfilled"]'),r=document.querySelector('input[value="rejected"]'),u=document.querySelector('input[name="delay"]'),l=document.querySelector(".form");let e=0,i=!1;s.addEventListener("click",c);function c(){i=!0}r.addEventListener("click",a);function a(){i=!1}u.addEventListener("input",d);function d(t){e=parseInt(t.target.value)}l.addEventListener("submit",m);function m(t){t.preventDefault(),setTimeout(()=>{f().then(o=>console.log(n.show({message:`✅ Fulfilled promise in ${e}ms`,color:"green",messageColor:"white",position:"topRight",timeout:!1}))).catch(o=>console.log(n.show({message:`❌ Rejected promise in ${e}ms`,color:"red",messageColor:"white",position:"topRight",timeout:!1})))},e),l.reset()}function f(){return new Promise((t,o)=>{i?t(`✅ Fulfilled promise in ${e}ms`):o(`❌ Rejected promise in ${e}ms`)})}
//# sourceMappingURL=commonHelpers2.js.map
