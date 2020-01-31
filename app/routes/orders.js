import Route from '@ember/routing/route';
import fetch from 'fetch';
import EmberResolver from 'ember-resolver';

export default class OrdersRoute extends Route {
  async model() {
    let url = "http://files.olo.com/pizzas.json";
    let val=0;
    let orders;
    let toppings = {};
    let toppingOptions = new Set();
    
    try {
      let response = await fetch(url);
      orders = await response.json();
    } catch(err) {
      alert("Fetch error");
    }
    
    orders.forEach((pizzaToppings) => {
      let currentTopping = pizzaToppings['toppings'].join('');
      toppings[currentTopping] = (toppings[currentTopping] || 0) + 1;
      toppingOptions.add(...currentTopping);
    });
    return {orders, toppings, toppingOptions};

  }
  setupController(controller, model) {
    super.setupController(controller, model);
    var sortedOrder = Object.entries(model.toppings).sort((a,b) => (b[1]-a[1]));
    controller.set('sortedOrder', sortedOrder.slice(0,20));
  }
} 