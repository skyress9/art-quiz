(()=>{"use strict";const t=class{static hide(t){t.classList.add("hide")}static openPage(t){setTimeout((()=>{t.classList.remove("hide")}),1)}static changePage(t,e=this.root){const s=e.firstElementChild;let a;"string"==typeof t?(this.pages[t].render(),a=this.pages[t].element):a=t,this.hide(s),s.ontransitionend=t=>{t.target.classList.value==s.classList.value&&(this.removePage(s),e.prepend(a),this.openPage(a),s.ontransitionend=null)}}static removePage(t){t.remove()}},e=class{static async getData(){const t=await fetch("./json/images.json");return await t.json()}static async createQuestionsCategories(t){const e=await this.getData(),s=e.length/2,a=e.length-1,i=e.slice(0,s),n=e.slice(s,a);return"artists"==t?i:n}static async createCardsQuestions(t){const e=await this.createQuestionsCategories(t),s=[];for(let t=0;t<e.length/10;t++)s[t]=e.slice(10*t,10*t+10);return s}};class s{static answers=localStorage.getItem("answers")?JSON.parse(localStorage.getItem("answers")):this.trackAnswers();static timeStatus=localStorage.getItem("timeStatus")?localStorage.getItem("timeStatus"):"false";static time=localStorage.getItem("time")?Number(localStorage.getItem("time")):5;static volumeStatus=localStorage.getItem("volumeStatus")?localStorage.getItem("volumeStatus"):"mute";static volume=localStorage.getItem("volume")?localStorage.getItem("volume"):.5;static trackAnswers(){let t=[];for(let e=0;e<24;e++)t[e]=null;return localStorage.setItem("answers",JSON.stringify(t)),t}static setAnswers(t,e,s){this.answers["artists"==e?t:Number(t)+12]=s,localStorage.setItem("answers",JSON.stringify(this.answers))}static getAnswersNum(t,e){let s=0;return"artists"==e||(t+=12),null===this.answers[t]?"":(this.answers[t].forEach((t=>{!0===t&&s++})),s+"/10")}static getAnswers(t,e){return"artists"==e||(t+=12),this.answers[t]}static setTimeStatus(t){this.timeStatus=String(t),localStorage.setItem("timeStatus",String(t))}static setTime(t){"-"==t?this.time-=5:this.time+=5,localStorage.setItem("time",this.time)}static setVolume(t){this.volume=t,localStorage.setItem("volume",t)}static setVolumeStatus(t){this.volumeStatus=t,localStorage.setItem("volumeStatus",t)}}const a=s,i=class{static right(){const t=new Audio("./assets/audio/correctanswer.mp3");t.volume=a.volume,"unmute"==a.volumeStatus&&t.play()}static wrong(){const t=new Audio("./assets/audio/wronganswer.mp3");t.volume=a.volume,"unmute"==a.volumeStatus&&t.play()}static end(){const t=new Audio("./assets/audio/endround.mp3");t.volume=a.volume,"unmute"==a.volumeStatus&&t.play()}},n=class{constructor(t){this.popupContainer=this.createPopup(),this.index=t}createButton(){const t=document.createElement("button");return t.classList.add("btn","popup__btn"),t.textContent="Continue",t.index=this.index,t}createPopup(){const t=document.createElement("div");return t.classList.add("popup","hide"),t}showPopup(t,e,s){const a=this.createButton();return s.innerHTML=`\n    <div class="overlay"></div>\n    <div class="popup__inner">\n      <div class="popup-img">\n        <div class="popup-img__image" style="background-image: url('https://raw.githubusercontent.com/skyress9/image-data/master/img/${t.imageNum}.jpg');"></div>\n        <div class="popup-img__boolean ${e}"></div>\n      </div>\n\n      <div class="popup-title">${t.name}</div>\n\n      <div class="popup__about">${t.author}, ${t.year}</div>\n    </div>`,s.querySelector(".popup__inner").append(a),1==e?i.right():i.wrong(),s}showResultPopup(t,e){const s=this.createPopup();return s.classList.add("popup-result","hide"),e=e[0].toUpperCase()+e.slice(1),s.innerHTML=`\n    <div class="overlay"></div>\n    <div class="popup__inner">\n      <div class="popup-img__result"></div>\n\n      <div class="popup-title popup-title__result">Congratulations!</div>\n\n      <div class="popup-result__score">${t}/10</div>\n\n      <div class="popup-result__buttons">\n        <button data-route="main" class="btn popup__btn">Home</button>\n        <button data-route="categories${e}" class="btn popup__btn popup__btn-continue">Next quiz</button>\n      </div>\n    </div>`,s}},r=class{constructor(t){this.type=t}createCategories(){const s=document.createElement("div");s.className="categories-page hide";const r=this.createHTML();return s.innerHTML=`\n    <div class="container">\n      <div class="categories-header">\n        <div class="categories-header__item categories-header__logo"></div>\n        <button data-route="settings" class="categories-header__item btn categories-settings__btn"></button>\n      </div>\n      <div class="categories-menu">\n        <div class="categories-menu__title">Categories</div>\n        <button data-route="main" class="btn categories-home__btn">Home</button>\n      </div>\n      <div class="categories-cards">\n        ${r}\n      </div>\n    </div>\n    <footer class="footer">\n      <div class="footer__item footer__logo"></div>\n      <div class="footer__item footer__author">skyress9</div>\n      <div class="footer__item footer__year">2021</div>\n    </footer>`,s.querySelectorAll(".categories-cards__card").forEach((s=>{s.addEventListener("click",(r=>{"score"==r.target.id?new class{constructor(e){this.type=e.slice(0,e.indexOf("-")),this.id=e.slice(e.indexOf("-")+1),this.createScore().then((e=>{t.changePage(e)}))}async createScore(){const t=document.createElement("div");t.classList.add("score-page","hide");const s=document.createElement("footer");s.classList.add("footer"),s.innerHTML='\n    <div class="footer__item footer__logo"></div>\n    <div class="footer__item footer__author">skyress9</div>\n    <div class="footer__item footer__year">2021</div>';const a=document.createElement("div");a.classList.add("container");const i=await e.createCardsQuestions(this.type),n=this.createCards(i[this.id]),r=this.createImage();return a.append(r),a.innerHTML+=`\n    <div class="score-page__nav">\n      <div class="score-page__title">Score</div>\n      <button data-route="categories${this.type[0].toUpperCase()+this.type.slice(1)}" class="btn btn-back__score">Back</button>\n    </div>`,a.append(n),t.append(a),t.append(s),t}createCards(t){const e=document.createElement("div");e.classList.add("score-page__cards");const s=a.getAnswers(Number(this.id),this.type);for(let a=0;a<t.length;a++){const i=document.createElement("div");i.classList.add("score-page__cards-card"),null!==s&&s[a]||i.classList.add("score-page__cards-card-gray");const n=document.createElement("div");n.classList.add("score__page-cards__card-about"),n.innerHTML=`\n      <div class="score-page__cards-name hide">${t[a].name}</div>\n      <div class="score-page__cards-author hide">${t[a].author}</div>\n      <div class="score-page__cards-year hide">${t[a].year}</div>`,i.style.backgroundImage=`url("https://raw.githubusercontent.com/skyress9/image-data/master/full/${t[a].imageNum}full.jpg")`,i.append(n),i.addEventListener("click",(()=>{n.childNodes.forEach((t=>{"DIV"==t.nodeName&&t.classList.toggle("hide")}))})),e.append(i)}return e}createImage(){const t=document.createElement("div");return t.classList.add("score-page__img"),t.style.backgroundImage=`url("https://raw.githubusercontent.com/skyress9/image-data/master/full/${this.id}full.jpg")`,t.innerHTML=`\n    <div class="score-page__img-number">${Number(this.id)+1}</div>\n    <div class="score-page__img-logo"></div>\n    <div class="score-page__img-score">${a.getAnswersNum(Number(this.id),this.type)}</div>`,t}}(s.id,s):new class{constructor(t){this.type=t.slice(0,t.indexOf("-")),this.id=t.slice(t.indexOf("-")+1),this.answers=[],this.startQuiz()}createContainer(t,e){return t[this.id].map(((s,i)=>{const r=document.createElement("div");r.classList.add("container-quiz","hide");const o=new n(i),c=o.createPopup();r.append(c);const d=this.createTitle(s);if(r.append(d),"true"==a.timeStatus){const t=this.createTimer();r.append(t),r.startTimer=()=>{if(t.textContent-=1,c.classList.contains("hide"))return t.textContent<1?(o.showPopup(s,!1,c),c.classList.remove("hide"),e.num=i+1,void this.answers.push(!1)):void setTimeout((()=>{r.startTimer(t,r)}),1e3)}}if("artists"==this.type){const t=this.createImg(s.imageNum);r.append(t)}const u=this.createButtons(t,s,e);return u.childNodes.forEach((t=>{t.addEventListener("click",(()=>{o.showPopup(s,t.isRight,c),c.classList.contains("hide")&&(c.classList.remove("hide"),e.num=i+1,t.isRight?(t.classList.add("right"),e.addPoint("points")):t.classList.add("wrong"),this.answers.push(t.isRight))}),{once:!0})})),r.append(u),r}))}createTitle(t){const e=document.createElement("div");return e.classList.add("quiz__item","quiz__question"),e.textContent="artists"==this.type?"Who is the author of this picture?":`Which is ${t.author} picture?`,e}createTimer(){const t=document.createElement("div");return t.classList.add("timer"),t.innerHTML=`${a.time+2}`,t}createImg(t){const e=document.createElement("img");return e.classList.add("quiz__item","quiz__img"),e.src=`https://github.com/skyress9/image-data/blob/master/img/${t}.jpg?raw=true`,e.alt="Image",e}createButtons(t,e){const s=document.createElement("div");return"artists"==this.type?s.classList.add("quiz__item","quiz-answers"):s.classList.add("quiz__item","quiz-answers","quiz-answers__pictures"),new class{constructor(t,e,s,a){this.data=t,this.id=e,this.element=s,this.cat=a,this.createAnswers()}createButton(t){const e="artists"==this.cat?document.createElement("button"):document.createElement("div");return"artists"==this.cat?(e.classList.add("btn","quiz-answers__btn"),t?(e.textContent=this.data[Math.round(11*Math.random())][Math.round(9*Math.random())].author,e.isRight=!1):(e.textContent=this.element.author,e.isRight=!0)):(e.classList.add("quiz-answers__picture"),t?(e.style.backgroundImage=`url("https://raw.githubusercontent.com/skyress9/image-data/master/img/${this.data[Math.round(11*Math.random())][Math.round(9*Math.random())].imageNum}.jpg")`,e.isRight=!1):(e.style.backgroundImage=`url("https://raw.githubusercontent.com/skyress9/image-data/master/img/${this.element.imageNum}.jpg")`,e.isRight=!0)),e}shuffleButtons(t){for(let e=t.length-1;e>0;e--){let s=Math.floor(Math.random()*(e+1));[t[e],t[s]]=[t[s],t[e]]}return t}createAnswers(){let t=[];for(t.push(this.createButton());t.length<4;){const e=this.createButton("wrong");t.some((t=>"artists"==this.cat?t.textContent==e.textContent:t.style.backgroundImage==e.style.backgroundImage))||t.push(e)}return t=this.shuffleButtons(t),t}}(t,this.id,e,this.type).createAnswers().forEach((t=>{s.append(t)})),s}createFooter(){const t=document.createElement("footer");return t.classList.add("footer"),t.innerHTML='<div class="footer__item footer__logo"></div>\n    <div class="footer__item footer__author">skyress9</div>\n    <div class="footer__item footer__year">2021</div>',t}createCards(e){const s=document.createElement("div");s.className="quiz-page hide";const r=new class{constructor(){this.points=0,this.num=0}addPoint(t){this[t]++}},o=this.createContainer(e,r);s.append(o[r.num]),"true"==a.timeStatus&&o[r.num].startTimer(),t.openPage(o[r.num]),s.addEventListener("click",(e=>{if(null!=e.target.index)if(e.target.index<o.length-1)t.changePage(o[r.num],s),"true"==a.timeStatus&&o[r.num].startTimer();else{const e=(new n).showResultPopup(r.points,this.type);t.changePage(e,s),a.setAnswers(this.id,this.type,this.answers),i.end()}}));const c=this.createFooter();s.append(c),t.changePage(s)}async startQuiz(){const t=await e.createCardsQuestions(this.type);this.createCards(t)}}(s.id)}))})),s}createHTML(){const t="artists"==this.type?0:120;let e="",s=0;for(let i=t;i<t+120;i+=10){let t,n=a.getAnswersNum(s,this.type);t=0===n.length?"categories-cards__card-img-gray":"",e+=`<div id="${this.type}-${s}" class="categories-cards__card">\n        <img class="categories-cards__card-img ${t}"\n          src="https://github.com/skyress9/image-data/blob/master/img/${i}.jpg?raw=true" alt="image">\n        <div class="categories-cards__card-bottom">\n          <div class="categories-cards__card-title">Round ${s+1}</div>\n          <div class="categories-cards__card-points">${n}</div>\n        </div>\n        <div id="score" class="categories-card__card-score">Score</div>\n      </div>`,s++}return e}render(){this.element=this.createCategories()}},o=class{constructor(){this.element=this.createMain()}createMain(){const t=document.createElement("div");return t.className="main-page hide",t.innerHTML='\n    <div class="container">\n      <div class="main__inner">\n        <btn data-route="settings" class="btn main-settings__btn"></btn>\n        <div class="main__logo"></div>\n        <div class="main__menu">\n          <button data-route="categoriesArtists" class="btn main__btn">Artists quiz</button>\n          <button data-route="categoriesPictures" class="btn main__btn">Pictures quiz</button>\n        </div>\n      </div>\n    </div>\n    <footer class="footer">\n      <div class="footer__item footer__logo"></div>\n      <div class="footer__item footer__author">skyress9</div>\n      <div class="footer__item footer__year">2021</div>\n    </footer>',t}render(){this.element=this.createMain()}},c=class{constructor(){this.element}createSettings(){const t=document.createElement("div");t.className="settings-page hide";const e=document.createElement("div");e.classList.add("container"),e.innerHTML='\n    <div class="settings-header">\n      <button data-route="main" class="btn settings-home__btn">Home</button>\n      <div class="settings-header__title">Settings</div>\n    </div>';const s=this.createContent();return e.append(s),t.append(e),t.insertAdjacentHTML("beforeend",'<footer class="footer">\n      <div class="footer__item footer__logo"></div>\n      <div class="footer__item footer__author">skyress9</div>\n      <div class="footer__item footer__year">2021</div>\n    </footer>'),t}createContent(){const t=document.createElement("div");t.classList.add("settings-content");const e=this.createVolume(),s=this.createTimeStatus(),a=this.createTimeSelect();return t.append(e,s,a),t}createVolume(){const t=document.createElement("div");t.classList.add("settings__item","settings-volume"),t.innerHTML='<div class="settings-title settings-volume__title">Volume</div>';const e=document.createElement("input");e.classList.add("settings-volume__input"),e.type="range",e.value=100*a.volume,e.addEventListener("input",(()=>{a.setVolume(Number((e.value/100).toFixed(1)))}));const s=document.createElement("button");return"mute"==a.volumeStatus?s.classList.add("btn","settings-volume__button"):s.classList.add("btn","settings-volume__button","unmute"),s.addEventListener("click",(()=>{s.classList.toggle("unmute"),s.classList.contains("unmute")?a.setVolumeStatus("unmute"):a.setVolumeStatus("mute")})),t.append(e,s),t}createTimeStatus(){const t=document.createElement("div");t.classList.add("settings__item","settings-time"),t.innerHTML='<div class="settings-title settings-time__title">Time game</div>';const e=document.createElement("div");e.classList.add("settings-time__checkbox");const s=document.createElement("input");return s.classList.add("settings-time__turn"),s.id="time-turn",s.name="time-turn",s.type="checkbox",s.checked="true"==a.timeStatus,s.addEventListener("click",(()=>{a.setTimeStatus(s.checked)})),e.append(s),e.insertAdjacentHTML("beforeend",'<label for="time-turn"></label>'),t.append(e),t}createTimeSelect(){const t=document.createElement("div");t.classList.add("settings__item","settings-answer"),t.innerHTML='<div class="settings-title settings-answer__title">Time to answer</div>';const e=document.createElement("div");e.classList.add("settings-answer__inner");const s=document.createElement("button");s.classList.add("btn","settings-answer__btn","settings-answer__btn-minus"),s.textContent="–",s.addEventListener("click",(()=>{a.time>5&&(a.setTime("-"),n.textContent=a.time)}));const i=document.createElement("button");i.classList.add("btn","settings-answer__btn","settings-answer__btn-plus"),i.textContent="+",i.addEventListener("click",(()=>{a.time<30&&(a.setTime(),n.textContent=a.time)}));const n=document.createElement("div");return n.classList.add("settings-answer__time"),n.textContent=a.time,e.append(s,n,i),t.append(e),t}render(){this.element=this.createSettings()}};new class{constructor(){const e=document.createElement("div");e.className="app",this.root=e,document.body.prepend(this.root),this.pages={main:new o,categoriesArtists:new r("artists"),categoriesPictures:new r("pictures"),settings:new c},t.root=this.root,t.pages=this.pages,this.root.append(this.pages.main.element),t.openPage(this.root.firstElementChild),this.root.addEventListener("click",(e=>{e.target.dataset.route&&t.changePage(e.target.dataset.route)}))}}})();