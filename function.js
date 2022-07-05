class DatePicker {

	constructor() {
		this.calendar = new Date();
		this.localDate = new Date();
		this.prevMonthLastDate = null;
		this.calWeekDays = [ "So", "Mo", "Di", "Mi", "Do", "Fr", "Sa"];
		this.calMonthName = [ "Jan", "Feb", "Mär", "Apr", "Mai", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Dez"];
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
			let yearLabel = document.querySelector(".calendar .calendar-year-label");
			yearLabel.innerHTML = this.calendar.getFullYear();
		};

		displayMonth = () => {
			let monthLabel = document.querySelector(
				".calendar .calendar-month-label"
			);
			monthLabel.innerHTML = this.calMonthName[this.calendar.getMonth()];
		};

		selectDate = (e) => {
			console.log(
				`${e.target.textContent} ${
					this.calMonthName[this.calendar.getMonth()]
				} ${this.calendar.getFullYear()}`
			);
		};

		plotSelectors = () => {
			document.querySelector(
				".calendar"
			).innerHTML += `<div class="calendar-inner"><div class="calendar-controls">
				<div class="calendar-prev"><a href="#"><svg xmlns="http://www.w3.org/2000/svg" width="128" height="128" viewBox="0 0 128 128"><path fill="#666" d="M88.2 3.8L35.8 56.23 28 64l7.8 7.78 52.4 52.4 9.78-7.76L45.58 64l52.4-52.4z"/></svg></a></div>
				<div class="calendar-year-month">
				<div class="calendar-month-label"></div>
				<div>-</div>
				<div class="calendar-year-label"></div>
				</div>
				<div class="calendar-next"><a href="#"><svg xmlns="http://www.w3.org/2000/svg" width="128" height="128" viewBox="0 0 128 128"><path fill="#666" d="M38.8 124.2l52.4-52.42L99 64l-7.77-7.78-52.4-52.4-9.8 7.77L81.44 64 29 116.42z"/></svg></a></div>
				</div>
				<div class="calendar-body"></div></div>`;
		};

		plotDayNames = () => {
			for (let i = 0; i < this.calWeekDays.length; i++) {
				document.querySelector(
					".calendar .calendar-body"
				).innerHTML += `<div>${this.calWeekDays[i]}</div>`;
			}
		};

		plotDates = () => {
			document.querySelector(".calendar .calendar-body").innerHTML = "";
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
					document.querySelector(
						".calendar .calendar-body"
					).innerHTML += `<div class="prev-dates"></div>`;
					prevMonthDatesArray.push(this.prevMonthLastDate--);
				} else {
					document.querySelector(
						".calendar .calendar-body"
					).innerHTML += `<div class="number-item" data-num=${count}><a class="dateNumber" href="#">${count++}</a></div>`;
				}
			}
			//remaining dates after month dates
			for (let j = 0; j < prevDateCount + 1; j++) {
				document.querySelector(
					".calendar .calendar-body"
				).innerHTML += `<div class="number-item" data-num=${count}><a class="dateNumber" href="#">${count++}</a></div>`;
			}
			this.highlightToday();
			this.plotPrevMonthDates(prevMonthDatesArray);
		};
		
		attachEvents = () => {
			let prevBtn = document.querySelector(".calendar .calendar-prev a");
			let nextBtn = document.querySelector(".calendar .calendar-next a");
			let dateNumber = document.querySelectorAll(".calendar .dateNumber");
			prevBtn.addEventListener(
				"click",
				this.navigateToPreviousMonth
			);
			nextBtn.addEventListener("click", this.navigateToNextMonth);
			for (var i = 0; i < dateNumber.length; i++) {
					dateNumber[i].addEventListener(
						"click",
						this.selectDate,
						false
					);
			}
		};

		highlightToday = () => {
			let currentMonth = this.localDate.getMonth() + 1;
			let changedMonth = this.calendar.getMonth() + 1;
			let currentYear = this.localDate.getFullYear();
			let changedYear = this.calendar.getFullYear();
			if (
				currentYear === changedYear &&
				currentMonth === changedMonth &&
				document.querySelectorAll(".number-item")
			) {
				document
					.querySelectorAll(".number-item")
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


		
		loopThroughNextDays = (count) => {
			if(count > 0) {
					// for(let i=1;i<=count;i++) {
					// 		document.querySelector('.calendar-body').innerHTML += `<div class="next-dates">${i}</div>`;
					// }
			}
		};

		attachEventsOnNextPrev = () => {
			this.plotDates();
			this.attachEvents();
		};

		init = () => {
			this.plotSelectors();
			this.plotDates();
			this.attachEvents();
		}
	};


const datePicker = new DatePicker();
datePicker.init();
