

import  menuArray from './data.js'
import { v4 as uuidv4 } from 'https://jspm.dev/uuid'

const modal = document.getElementById("modal")

let orderList = []
let userName = ''

// --- Eventlisteners ---

document.addEventListener('click', function (e) {
  handleClicks(e)
})

function handleClicks(e) {
  if (e.target.dataset.id && e.target.className == "add-item-btn") {
    addOrderItem(e.target.dataset.id)
  } else if (e.target.dataset.uuid && e.target.className == "remove-btn") {
    removeOrderItem(e.target.dataset.uuid)
  } else if (e.target.dataset.name && e.target.className == "complete-order-btn") {
    showModal()
  }
}

form.addEventListener('submit', function (e) {
  e.preventDefault()
  payOrder(e)
})

//  --- Display Menu Items ---

function getItemHtml() {
  let itemHtml = ''

  menuArray.forEach(item => {
    let descrtiption = item.ingredients.join(", ")
    itemHtml += `
        <div class="item">
            <div class="item-info">
                <p class="item-emoji">${item.emoji}</p>
                <div class"item-description"> 
                    <p class="item-name">${item.name}</p>
                    <p class="item-ingredients">${descrtiption}</p>
                    <p class="item-price">$${item.price}</p>  
                </div>
            </div>
            <button class="add-item-btn" data-id="${item.id}">+</button>
        </div>
        `
  })
  return itemHtml
}

// --- Add Items to Order and display Orderlist ---

function addOrderItem(clickedId) {
  const addedItem = menuArray.filter(item => item.id == clickedId)
  const uuid = uuidv4()
  orderList.push({ ...addedItem[0], uuid })
  render()
}
function getOrderListHtml() {
  let orderListHtml = ''

  orderList.forEach(order => {
    orderListHtml += `
            <div class="order-item">
                <p>${order.name}</p>
                <button class="remove-btn" data-uuid="${order.uuid}">remove</button>
                <p class="order-item-price">$${order.price}</p>
            </div>
        ` })
  return orderListHtml
}

function getTotalOrderPrice() {
  return orderList.map(order => order.price).reduce((sum, price) => sum + price, 0)
}

function getOrderHtml() {
  let orderHtml = ''

  orderHtml = `
        <p class="order-title">Your Oder</p>
        ${getOrderListHtml()}
        <div class="total-price">
            <p>Total Price</p>
            <p>$${getTotalOrderPrice()}</p>
        </div>
        <button id="complete-order-btn" class="complete-order-btn" data-name="btn">Complete Order</button>        
    `
  return orderHtml
}

// --- Remove Item from Orderlist ---

function removeOrderItem(clickedUuid) {
  orderList.splice(orderList.findIndex(order => order.uuid == clickedUuid), 1)
  render()
}

//  --- Display Billing Modal ---

function showModal() {
  modal.style.display = "block"
}

function payOrder(e) {
  userName = e.target.name.value
  resetModal()
  orderList = []
  render()
  userName = ''
}

function resetModal() {
  document.getElementById("form").reset()
  modal.style.display = "none"
}

//  --- Render App ---

function render() {
  document.getElementById('items').innerHTML = getItemHtml()

  const orderHtml = orderList.length > 0 ? getOrderHtml() : ''
  document.getElementById('order-list').innerHTML = orderHtml

  const orderCompleteHtmml = userName ? `<p class="order-complete">Thanks ${userName}! Your order is on its way!<p>` : ''
  document.getElementById('order-complete').innerHTML = orderCompleteHtmml
}

render()