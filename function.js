class DatePicker {

	constructor() {
		this.calendar = new Date();
		this.localDate = new Date();
		this.prevMonthLastDate = null;
		this.calWeekDays = [ "So", "Mo", "Di", "Mi", "Do", "Fr", "Sa"];
		this.calMonthName = [ "Jan", "Feb", "Mär", "Apr", "Mai", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Dez"];
		this.elements = {
			calendar: {
				body: document.querySelector(".calendar .calendar-body"), 
				labels: {
					month: document.querySelector(".calendar .calendar-month-label"),
					year: document.querySelector(".calendar .calendar-year-label"),
				},
				dateNumber: document.querySelectorAll(".calendar .date-number"),
				buttons: {
					next: document.querySelector('.calendar .calendar-next a'),
					prev: document.querySelector('.calendar .calendar-prev a')
				}
			}
		}
	};

		daysInMonth = (month, year) => {
			return new Date(year, month, 0).getDate();
		};

		firstDay = () => {
			return new Date(this.calendar.getFullYear(), this.calendar.getMonth(), 1);
		};

		lastDay = () => {
			return new Date(this.calendar.getFullYear(), this.calendar.getMonth() + 1, 0);
		};

		firstDayNumber = () => {
			return this.firstDay().getDay() + 1;
		};

		lastDayNumber = () => {
			return this.lastDay().getDay() + 1;
		};

		getPreviousMonthLastDate = () => {
			let lastDate = new Date(
				this.calendar.getFullYear(),
				this.calendar.getMonth(),
				0
			).getDate();
			return lastDate;
		};

		navigateToPreviousMonth = () => {
			this.calendar.setMonth(this.calendar.getMonth() - 1);
			this.attachEventsOnNextPrev();
		};

		navigateToNextMonth = () => {
			this.calendar.setMonth(this.calendar.getMonth() + 1);
			this.attachEventsOnNextPrev();
		};

		navigateToCurrentMonth = () => {
			let currentMonth = this.localDate.getMonth();
			let currentYear = this.localDate.getFullYear();
			this.calendar.setMonth(currentMonth);
			this.calendar.setYear(currentYear);
			this.attachEventsOnNextPrev();
		};

		displayYear = () => {
			this.elements.calendar.labels.year.innerHTML = this.calendar.getFullYear();
		};

		displayMonth = () => {
			this.elements.calendar.labels.month.innerHTML = this.calMonthName[this.calendar.getMonth()];
		};

		selectDate = (e) => {
			console.log(
				`${e.target.textContent} ${
					this.calMonthName[this.calendar.getMonth()]
				} ${this.calendar.getFullYear()}`
			);
		};


		plotDayNames = () => {
			for (let i = 0; i < this.calWeekDays.length; i++) {
				this.elements.calendar.body.innerHTML += `<div>${this.calWeekDays[i]}</div>`
			}
		};

		plotDates = () => {
			this.elements.calendar.body.innerHTML = "";
			this.plotDayNames();
			this.displayMonth();
			this.displayYear();
			let count = 1;
			let prevDateCount = 0;

			this.prevMonthLastDate = this.getPreviousMonthLastDate();
			let prevMonthDatesArray = [];
			let calendarDays = this.daysInMonth(
				this.calendar.getMonth() + 1,
				this.calendar.getFullYear()
			);
			// dates of current month
			for (let i = 1; i < calendarDays; i++) {
				if (i < this.firstDayNumber()) {
					prevDateCount += 1;
					this.elements.calendar.body.innerHTML += `<div class="prev-dates"></div>`;
					prevMonthDatesArray.push(this.prevMonthLastDate--);
				} else {
					this.elements.calendar.body.innerHTML += `<div class="number-item" data-num=${count}><a class="date-number" href="#">${count++}</a></div>`;
				}
			}
			//remaining dates after month dates
			for (let j = 0; j < prevDateCount + 1; j++) {
				this.elements.calendar.body.innerHTML += `<div class="number-item" data-num=${count}><a class="date-number" href="#">${count++}</a></div>`;
			}
			this.highlightToday();
			this.plotPrevMonthDates(prevMonthDatesArray);
		};
		
		attachEvents = () => {
		  this.elements.calendar.dateNumber = document.querySelectorAll(".calendar .date-number");
			this.elements.calendar.buttons.prev.addEventListener('click', this.navigateToPreviousMonth);
			this.elements.calendar.buttons.next.addEventListener('click', this.navigateToNextMonth);
			this.elements.calendar.dateNumber.forEach((item) => {
				item.addEventListener('click', (event) => this.selectDate(event), false)
			})
		};

		highlightToday = () => {
			let currentMonth = this.localDate.getMonth() + 1;
			let changedMonth = this.calendar.getMonth() + 1;
			let currentYear = this.localDate.getFullYear();
			let changedYear = this.calendar.getFullYear();
			let numberItems = document.querySelectorAll('.number-item');
			if (
				currentYear === changedYear &&
				currentMonth === changedMonth &&
				numberItems
			) {
					numberItems
					[this.calendar.getDate() - 1].classList.add("calendar-today");
			}
		};

		plotPrevMonthDates = (dates) => {
			dates.reverse();
			for(let i=0;i<dates.length;i++) {
					if(document.querySelectorAll(".prev-dates")) {
							document.querySelectorAll(".prev-dates")[i].textContent = dates[i];
					}
			}
		};


		
		attachEventsOnNextPrev = () => {
			this.plotDates();
			this.attachEvents();
		};

		init = () => {
			this.plotDates();
			this.attachEvents();
		}
	};


const datePicker = new DatePicker();
datePicker.init();
