$(document).ready(function () {
  alert('Connected');
  //Horizontal collapsible menu
  const sideslider = $('[data-toggle=collapse-side]');
  const sel = sideslider.attr('data-target');
  const sel2 = sideslider.attr('data-target-2');
  let url = window.location.href;
  sideslider.click(function (event) {
    $(sel).toggleClass('in');
    $(sel2).toggleClass('out');
  });

  // Add margin top to navbar on login scree
  const header = $('header');
  const sidecollapse = $('.side-collapse-container');
  if (header.hasClass('navbar-fixed-top')) {
    sidecollapse.css('margin-top', '60px');
  }

  const home = $('body');
  const categoryShow = $('[data-target=category-section]');
  const categorySection = $('#category-section');

  if (home.hasClass('home')) {
    categorySection.hide();
  }
  categoryShow.bind('click', function () {
    categorySection.toggle('slow');
  });

  // Login form validation to check if fields are empty
  const loginForm = $('#loginForm');
  const loginSubmit = $('#loginSubmit');

  const dni = $('input[name=dni]');
  const user = $('input[name=username]');
  const password = $('input[name=password]');

  const dniMessage = $('.message.dni');
  const userMessage = $('.message.user');
  const passwordMessage = $('.message.password');

  dniMessage.css('display', 'none');
  userMessage.css('display', 'none');
  passwordMessage.css('display', 'none');

  loginSubmit.bind('click', function () {
    event.preventDefault();

    if (dni.val() == '') {
      console.log('Vacio');
      dni.addClass('is-invalid');
      dniMessage.css('display', 'block');
    } else {
      console.log(dni.val());
      dni.removeClass('is-invalid');
      dniMessage.css('display', 'none');
    }
    if (user.val() == '') {
      console.log('Vacio');
      user.addClass('is-invalid');
      userMessage.css('display', 'block');
    } else {
      console.log(user.val());
      user.removeClass('is-invalid');
      userMessage.css('display', 'none');
    }
    if (password.val() == '') {
      console.log('Vacio');
      password.addClass('is-invalid');
      passwordMessage.css('display', 'block');
    } else {
      console.log(password.val());
      password.removeClass('is-invalid');
      passwordMessage.css('display', 'none');
    }

    if ((email.val() !== '') && (password.val() !== '')) {
      loginValidate();
    }

  });

  let loginValidate = () => {
    console.log(window.location.protocol + '//' + window.location.host + '/home');
    window.location.href = window.location.protocol + '//' + window.location.host + '/home';
  }

  email.keyup(function () {
    console.log(email);
    if (email.hasClass('is-invalid')) {
      email.removeClass('is-invalid')
      emailMessage.css('display', 'none');
    }
  });

  dni.keyup(function () {
    console.log(dni);
    if (dni.hasClass('is-invalid')) {
      dni.removeClass('is-invalid')
      dniMessage.css('display', 'none');
    }
  });

  user.keyup(function () {
    console.log(user);
    if (user.hasClass('is-invalid')) {
      user.removeClass('is-invalid')
      userMessage.css('display', 'none');
    }
  });

  password.keyup(function () {
    console.log(password);
    if (password.hasClass('is-invalid')) {
      password.removeClass('is-invalid')
      passwordMessage.css('display', 'none');
    }
  });

});