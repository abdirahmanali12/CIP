export const toggleClass = (element, className = "hide") => {
  const classes = [...element.classList];
  if (classes.indexOf(className) > -1) element.classList.remove(className);
  else element.classList.add(className);
};

const customerInfo = (customer = {}) => {
  const { name, phone, id } = customer;
  const div = document.createElement("div");
  div.classList.add("customer");
  div.innerHTML = `<header class="customer-info">
            <div class="image">
              <i class="fas fa-user-circle"></i>
            </div>
            <div class="c-title">
              <h1>${name}</h1>
              <span>${phone}</span>
            </div>
          </header>
          <button data-id="${id}" class="btn primary">Profile</button>
        `;
  return div;
};

export const displayCustomer = (customerData = {}) => {
  const customerContainer = document.querySelector(".customers-container");
  const counter = customerContainer.previousElementSibling.lastElementChild;
  const customer = customerInfo(customerData);
  customerContainer.append(customer);
  counter.textContent = `${customerContainer.childElementCount} Of Current Customers`;
};
