import {timeFormat} from "../utils.js";
import {MONTH_NAMES, DAYS, COLORS} from "../const.js";

export const createEditCardTemplate = (task) => {

  const {color, dueDate, description, repeatingDays} = task;

  const isRepeatingClass = Object.values(repeatingDays).some(Boolean);
  const repeatClass = isRepeatingClass ? `card--repeat` : ``;

  const isExpired = dueDate instanceof Date && dueDate < Date.now();
  const isDateShowing = !!dueDate;

  const date = isDateShowing ? `${dueDate.getDate()} ${MONTH_NAMES[dueDate.getDate()]}` : ``;
  const time = isDateShowing ? `${timeFormat(dueDate)}` : ``;

  const deadLineClass = isExpired ? `card--deadline` : ``;


  const createColorsMarkup = (colors, currentColor) => {

    return colors.map((colore, index) => {

      return `<input type="radio"
              id="color-${colore}-${index}"
              class="card__color-input card__color-input--${colore} visually-hidden"
              name="color"
              value="${colore}"
              ${currentColor === colore ? `checked` : ``}>
            <label
            for="color-${colore}-${index}"
              class="card__color card__color--${colore}">${colore}
            </label>`;
    }).join(`\n`);
  };

  const createRepeatingDaysMarkup = (days, repeatingdays) => {
    return days
      .map((day, index) => {
        const isChecked = repeatingdays[day];
        return `
      <input
        class="visually-hidden card__repeat-day-input"
        type="checkbox"
        id="repeat-${day}-${index}"
        name="repeat"
        value="${day}"
        ${isChecked ? `checked` : ``}
        >
      <label
        class="card__repeat-day"
        for="repeat-${day}-${index}">${day}
      </label>`;
      }).join(`\n`);
  };

  const repeatingDaysMarkup = createRepeatingDaysMarkup(DAYS, repeatingDays);
  const colorsMarkup = createColorsMarkup(COLORS, color);

  return (
    `
      <article class="card card--edit card--${color} ${repeatClass} ${deadLineClass}">
            <form class="card__form" method="get">
              <div class="card__inner">
                <div class="card__color-bar">
                  <svg class="card__color-bar-wave" width="100%" height="10">
                    <use xlink:href="#wave"></use>
                  </svg>
                </div>

                <div class="card__textarea-wrap">
                  <label>
                    <textarea class="card__text" placeholder="Start typing your text here..." name="text">${description}</textarea>
                  </label>
                </div>

                <div class="card__settings">
                  <div class="card__details">
                    <div class="card__dates">
                      <button class="card__date-deadline-toggle" type="button">
                        date: <span class="card__date-status">${isDateShowing ? `yes` : `no`}</span>
                      </button>

                      ${isDateShowing ? `
                      <fieldset class="card__date-deadline">
                        <label class="card__input-deadline-wrap">
                          <input class="card__date" type="text" placeholder="" name="date" value="${date} ${time}">
                        </label>
                      </fieldset>`
      : ``
    }

                      <button class="card__repeat-toggle" type="button">
                        repeat:<span class="card__repeat-status">${isRepeatingClass ? `yes` : `no`}</span>
                      </button>

                      <fieldset class="card__repeat-days">
                        <div class="card__repeat-days-inner">
                          ${repeatingDaysMarkup}
                        </div>
                      </fieldset>
                    </div>
                  </div>

                  <div class="card__colors-inner">
                    <h3 class="card__colors-title">Color</h3>
                    <div class="card__colors-wrap">
                      ${colorsMarkup}
                    </div>
                  </div>
                </div>

                <div class="card__status-btns">
                  <button class="card__save" type="submit">save</button>
                  <button class="card__delete" type="button">delete</button>
                </div>
              </div>
            </form>
          </article>
    `
  );
};