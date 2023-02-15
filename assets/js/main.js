/*
	Arcana by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(function($) {

	var	$window = $(window),
		$body = $('body');

	// Breakpoints.
		breakpoints({
			wide:      [ '1281px',  '1680px' ],
			normal:    [ '981px',   '1280px' ],
			narrow:    [ '841px',   '980px'  ],
			narrower:  [ '737px',   '840px'  ],
			mobile:    [ '481px',   '736px'  ],
			mobilep:   [ null,      '480px'  ]
		});

	// Play initial animations on page load.
		$window.on('load', function() {
			window.setTimeout(function() {
				$body.removeClass('is-preload');
			}, 100);
		});

	// Dropdowns.
		$('#nav > ul').dropotron({
			offsetY: -15,
			hoverDelay: 0,
			alignment: 'center'
		});

	// Nav.

		// Bar.
			$(
				'<div id="titleBar">' +
					'<a href="#navPanel" class="toggle"></a>' +
					'<span class="title">' + $('#logo').html() + '</span>' +
				'</div>'
			)
				.appendTo($body);

		// Panel.
			$(
				'<div id="navPanel">' +
					'<nav>' +
						$('#nav').navList() +
					'</nav>' +
				'</div>'
			)
				.appendTo($body)
				.panel({
					delay: 500,
					hideOnClick: true,
					hideOnSwipe: true,
					resetScroll: true,
					resetForms: true,
					side: 'left',
					target: $body,
					visibleClass: 'navPanel-visible'
				});

})(jQuery);
const calculator = {
	displayValue: '0',
	firstOperand: null,
	waitingForSecondOperand: false,
	operator: null,
  };
  
  function inputDigit(digit) {
	const { displayValue, waitingForSecondOperand } = calculator;
  
	if (waitingForSecondOperand === true) {
	  calculator.displayValue = digit;
	  calculator.waitingForSecondOperand = false;
	} else {
	  calculator.displayValue = displayValue === '0' ? digit : displayValue + digit;
	}
  }
  
  function inputDecimal(dot) {
	// If the `displayValue` does not contain a decimal point
	if (!calculator.displayValue.includes(dot)) {
	  // Append the decimal point
	  calculator.displayValue += dot;
	}
  }
  
  function handleOperator(nextOperator) {
	const { firstOperand, displayValue, operator } = calculator
	const inputValue = parseFloat(displayValue);
  
	if (operator && calculator.waitingForSecondOperand)  {
	  calculator.operator = nextOperator;
	  return;
	}
  
	if (firstOperand == null) {
	  calculator.firstOperand = inputValue;
	} else if (operator) {
	  const currentValue = firstOperand || 0;
	  const result = performCalculation[operator](currentValue, inputValue);
  
	  calculator.displayValue = String(result);
	  calculator.firstOperand = result;
	}
  
	calculator.waitingForSecondOperand = true;
	calculator.operator = nextOperator;
  }
  
  const performCalculation = {
	'/': (firstOperand, secondOperand) => firstOperand / secondOperand,
  
	'*': (firstOperand, secondOperand) => firstOperand * secondOperand,
  
	'+': (firstOperand, secondOperand) => firstOperand + secondOperand,
  
	'-': (firstOperand, secondOperand) => firstOperand - secondOperand,
  
	'=': (firstOperand, secondOperand) => secondOperand
  };
  
  function resetCalculator() {
	calculator.displayValue = '0';
	calculator.firstOperand = null;
	calculator.waitingForSecondOperand = false;
	calculator.operator = null;
  }
  
  function updateDisplay() {
	const display = document.querySelector('.calculator-screen');
	display.value = calculator.displayValue;
  }
  
  updateDisplay();
  
  const keys = document.querySelector('.calculator-keys');
  keys.addEventListener('click', (event) => {
	const { target } = event;
	if (!target.matches('button')) {
	  return;
	}
  
	if (target.classList.contains('operator')) {
	  handleOperator(target.value);
	  updateDisplay();
	  return;
	}
  
	if (target.classList.contains('decimal')) {
	  inputDecimal(target.value);
	  updateDisplay();
	  return;
	}
  
	if (target.classList.contains('all-clear')) {
	  resetCalculator();
	  updateDisplay();
	  return;
	}
  
	inputDigit(target.value);
	updateDisplay();
  });