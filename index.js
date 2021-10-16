let commodity =[
    {
        name:'Coke',
        Name:'可口可乐',
        price:3.50,
        vipPrice:3.00
    },
    {
        name:'Milk',
        Name:'澳大利亚牛奶',
        price:74.00,
        vipPrice:72.00
    }
]

contentListener()
// 监听内容区所有商品
function contentListener(){
    let  showCommoditys = document.querySelectorAll('.content-container');
    for(let i =0;i<showCommoditys.length;i++){
    showCommoditys[i].addEventListener('click',function(e) {
        let Commodity = e.target.id;
        if(Commodity != ''){
            renderCommodity(Commodity)
        }
    })
}
}

commodityASListener()
// 监听收银台加减按钮
function commodityASListener(){
    let Btns = document.querySelectorAll('.priceInformation-right');
    for(let i = 0; i <Btns.length;i++) {
        Btns[i].addEventListener('click',function(e) {
            if(e.target.id !=0){
                changeCommodityNumber(e.target)
            }
        })
    }
}

// 监听搜索按钮
let searchBtn = document.querySelector('#searchBtn');
searchBtn.addEventListener('click',function(e){
    searchCommodity()
})

// 搜索商品
function searchCommodity() {
    let searchInput = document.querySelector('#searchInput');
    let userInput = searchInput.value;
    console.log(userInput)
    for(let i=0; i<commodity.length; i++){
        if(commodity[i].Name == userInput){
            
            renderContent(commodity[i].name)
        }
    }
    searchInput.value = '';
}

//加减商品
function changeCommodityNumber(e){
   let addSymbol = e.textContent;
   let eParent = e.parentNode
   let number = eParent.children[1];
   
   if(addSymbol == '+'){
       number.textContent =+number.textContent+1
       price(e,'+');
   }
   else{
       if(number.textContent >1){
        
          number.textContent =+number.textContent-1
          price(e,'-');
       }
       else{
           //移除商品
           eParent.parentNode.parentNode.removeChild(eParent.parentNode);
       }
   }
}

// 价格处理
function price(e,symbol){
    
    let eParent = e.parentNode
    let ePParent = eParent.parentNode
    let selectNumber = e.id.indexOf('-')
    let commodityName = e.id.substring(0, selectNumber);
    let commodityPrice = ePParent.querySelector(`.${commodityName}-subtotal`)
    for(let i=0;i<commodity.length;i++){

        if(commodity[i].name == commodityName){
            if(symbol == '+'){
                commodityPrice.textContent = +commodityPrice.textContent + commodity[i].price;
            }
            else{
                commodityPrice.textContent = +commodityPrice.textContent - commodity[i].price;
            }
        }
    }

}



// 内容区域数据渲染
function renderContent(name){
    
    let content = document.querySelector('.right-content');
    for(let i=0; i<commodity.length; i++){
        if(commodity[i].name == name){
            content.innerHTML =`
            <div class="content-container">
                <div class="container-img">
                    <img src="img/${commodity[i].name}-img.png" alt="">
                </div>
                <div class="container-content">
                    <div class="container-content-title" >
                        <a><span id="${commodity[i].name}">${commodity[i].Name}</span></a>
                    </div>
                    <div class="container-content-specification">
                        <span>单规格</span>
                    </div>
                    <div class="price">
                        <span>￥${commodity[i].price}</span>
                    </div>
                </div>
            </div>
            `
            contentListener()
        }

    }
}

//收银台数据渲染
 function renderCommodity(name){
     let cashier = document.querySelector('#cashier');
     for(let i=0; i<commodity.length; i++){
         if(commodity[i].name == name){
            cashier.innerHTML +=`
            <div class="priceInformation" >
                <div class="priceInformation-left">
                    <div class="priceInformation-title">
                        <span>${commodity[i].Name}</span>
                    </div>
                    <div class="priceInformation-middle">
                        <span>￥${commodity[i].price}</span>
                        <span>折扣：￥${commodity[i].price - commodity[i].vipPrice}</span>
                        <span>会员价：￥${commodity[i].vipPrice}</span>
                    </div>
                    <div class="priceInformation-bottom">
                        <span>小计：￥</span>
                        <span class="${commodity[i].name}-subtotal">${commodity[i].price}</span>
                    </div>
                </div>
                <div class="priceInformation-right">
                <button class="price-button price-button-subtract price-number-subtract-btn" id="${commodity[i].name}-subtract" >-</button>
                <span class="price-number" >1</span>
                <button class="price-button  price-button-add price-number-add-btn" id="${commodity[i].name}-add">+</button>
            </div>

            </div>
         `
         commodityASListener()
         }
     }
    
 }




