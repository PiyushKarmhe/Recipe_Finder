const app_id = "b221a1a9";
const app_key = "29577e76873f292a3a8cb25e1fd438ae";
const button = document.querySelector(".search");
const input = document.querySelector("input");
const cardsHolder = document.querySelector(".cardHolder");
const h2 = document.querySelector("h2");

const getRecipe = async (query)=>{
    try{
        cardsHolder.innerHTML="";
        const endPoint = `https://api.edamam.com/api/recipes/v2?type=public&q=${query}&app_id=${app_id}&app_key=${app_key}`;
        const res = await fetch(endPoint);
        const data = await res.json();
        console.log(data.hits[1].recipe);
        h2.innerHTML=`Look what Recipies we found for "${query}"`;
        data.hits.map(cards=>{
            cards = cards.recipe;
            console.log(cards);
            const card = document.createElement('div');
            card.classList.add("card");
            card.tabIndex = 1;

            const head = document.createElement('div');
            head.classList.add("head");

            const img = document.createElement("img");
            img.classList.add("cardImg");
            img.src = cards.image;
            head.appendChild(img);

            const tag_l = document.createElement("div");
            tag_l.classList.add('tags-l');
            tag_l.classList.add('hid');
            cards.healthLabels.map(label=>{
                const tag = document.createElement("span");
                tag.classList.add("tag");
                tag.innerHTML=label;
                tag_l.appendChild(tag);
            })
            head.appendChild(tag_l);
            card.appendChild(head);

            const title = document.createElement("h3");
            title.classList.add("title");
            title.innerHTML = cards.label;
            card.appendChild(title);


            const dis = document.createElement("h4");
            dis.classList.add("dis");
            dis.innerHTML = `<span class="Cuisine">${cards.cuisineType[0][0].toUpperCase() + cards.cuisineType[0].slice(1)}</span><span class="IngriCount">${cards.ingredientLines.length}</span>`;
            card.appendChild(dis);

            const cal = document.createElement("h4");
            cal.classList.add("cal");
            cal.innerHTML = `Calories : <span class="calv">${cards.calories}</span>`;
            card.appendChild(cal);

            const hid_cal_1 = document.createElement("h4");
            hid_cal_1.classList.add("hid");
            hid_cal_1.classList.add("cal");
            hid_cal_1.innerHTML = `Meal Type: <span class="calv">${cards.mealType}</span>`;
            card.appendChild(hid_cal_1);

            const hid_cal_2 = document.createElement("h4");
            hid_cal_2.classList.add("hid");
            hid_cal_2.classList.add("cal");
            hid_cal_2.innerHTML = `Dish Type: <span class="calv">${cards.dishType}</span>`;
            card.appendChild(hid_cal_2);

            const title_hid_ingriHead = document.createElement("h3");
            title_hid_ingriHead.classList.add("title");
            title_hid_ingriHead.classList.add("hid");
            title_hid_ingriHead.classList.add("ingriHead");
            title_hid_ingriHead.innerHTML = "Ingridents";
            card.appendChild(title_hid_ingriHead);
            
            const ol = document.createElement("ol");
            ol.classList.add('hid');
            cards.ingredientLines.map(item=>{
                const list = document.createElement("li");
                list.innerHTML=item;
                ol.appendChild(list);
            });
            card.appendChild(ol);

            const a = document.createElement("a");
            a.classList.add('more');
            a.href=cards.url;
            a.innerHTML="Go to site ->";
            card.appendChild(a);

            const tag_b = document.createElement("div");
            tag_b.classList.add('tags-b');
            tag_b.classList.add('hid');
            cards.healthLabels.map(label=>{
                const tag = document.createElement("span");
                tag.classList.add("tag");
                tag.innerHTML=label;
                tag_b.appendChild(tag);
            })
            card.appendChild(tag_b);

            cardsHolder.appendChild(card);
        })
    }
    catch (err) {
        console.log(err);
    }
}

const search =()=>{
    const query = input.value;
    getRecipe(query);
};

button.addEventListener('click',search);

input.addEventListener('keypress', (e)=> {
    if (e.key === 'Enter') {
      search();
    }
});

