import {menuArray} from './data.js'
const menuFeed = document.getElementById('menu-feed')
const orderingFeed = document.getElementById('ordering-feed')
const orderHeader = document.getElementById('order-header')
const totalAmount = document.getElementById("total-amount")
const completeOrderBtn = document.getElementById('completeorder-btn')
const customersCard = document.getElementById('customers-card')
const formDetails = document.getElementById('form-details')


const thankYouText = document.getElementById("thankyou-text")
const chooseMenu = document.getElementById('choose-menu')


let totalQuantity = menuArray[0].quantity + menuArray[1].quantity + menuArray[2].quantity


    function getListOnMenu(){
    let foodList = " "
   menuArray.forEach(function(menu){
    foodList += `
                 <div class = "itemsid">
                <div class="menu">
                
                <p class="emoji">${menu.emoji}</p>
                <div class = "items">
                 <p class = "name">${menu.name}</p>
                
                 <p class = "ingredients">${menu.ingredients}</p>
                
                 <p class = "price">$${menu.price}</p> 
                </div>
                </div>
                 <button class = "btn" data-add = "${menu.id}">+</button>
                </div>
                 
                 `
})
    return foodList

}

function render(){
    menuFeed.innerHTML = getListOnMenu()
    chooseMenu.style.display = 'inline'
}
render()

//the function that listens to addItem and removeItem
document.addEventListener("click",function(e){
       
    if (e.target.dataset.add){
     addItemToOrderList(e.target.dataset.add)
    } else if(e.target.dataset.remove){
        removeItemFromOrderList(e.target.dataset.remove)
    }
    
})

completeOrderBtn.addEventListener('click',function(){
    customersCard.style.display = 'inline'
    
})

//this function adds a choosen menuArray

function addItemToOrderList(menuId){
    let targetMenu = menuArray.filter(function(menu){
        return menu.id == menuId
    })[0]
    menuArray[menuId].quantity +=1
     
   
    logOutOrderArray()
     chooseMenu.style.display = 'none'
}
 

//this function removes an unwanted item from orderArray
function removeItemFromOrderList(menuId){
let targetMenu = menuArray.filter(function(menu){
    return menu.id == menuId
})
menuArray[menuId].quantity -=1
if(totalQuantity===0){
    orderHeader.style.display='none'
     document.getElementById('choose-menu').classList.remove('my-order')
}
logOutOrderArray()
 chooseMenu.style.display = 'none'
}

// this function logs out customers order
function logOutOrderArray(){
   
    
    let orderlist = ''
    let totalPrice = 0
    menuArray.forEach(function(menu){
            console.log(menu.price)
        if (menu.quantity > 0){
             orderHeader.style.display='inline'
             document.getElementById('choose-menu').classList.add('my-order')
           totalPrice += menu.price*menu.quantity
            
            orderlist += `  
                            <div class = 'order-flex'>
                            <p class = "menu-name">${menu.name}<button class = 'remove-btn'
                            data-remove = '${menu.id}'>remove Item</button></p>
                            <p class = "menu-price">$${menu.price*menu.quantity}</p>
                        </div>
                        
                        `
            
       }
       
    })
    
     orderingFeed.innerHTML = orderlist
      totalAmount.innerHTML =  '$'+ totalPrice
   
   render() 
}


//submit button that resets the form

formDetails.addEventListener('submit', function(e){
    e.preventDefault()
      customersCard.style.display = 'none'
      orderHeader.style.display = 'none'
      menuArray[0].quantity = 0
      menuArray[1].quantity = 0
       menuArray[2].quantity = 0
      
      const formDetailsData = new FormData(formDetails)
      const name = formDetailsData.get('yourname')
      
            
            thankYouText.style.display = 'inline'
            document.getElementById('thankyou-text').innerHTML= `<div class = 'purchase'><h3>Thanks <span class = 'thanks'>${ name }</span> for your purchase</h3></div>`
            
            
            
            
         
            
        setTimeout(function(){
                 chooseMenu.style.display = 'inline'
                thankYouText.style.display = 'none'
              
      }, 4000)
      
      
    setTimeout(function(){
       formDetails.reset() 
    }, 8000)
      
      
    
      
      
})



