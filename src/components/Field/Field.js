import './style.css';

const template = `
    <input type="number" class="widget__input" id="donation-amount" required>
    <label class="widget__label" for="donation-amount">Cумма</label>
    <div class="widget__currency">₽</div>
    <div class="widget__bar"></div>
    <div class="widget__message" id="error-message">Введите сумму</div>`;

const errorMessage = (value) => {
    let message = '';

    if (!/^[0-9]{1,6}([,.][0-9]{1,2})?$/.test(value)) {
        message = 'Некорректная сумма';
    }
    if (!value) {
        message = 'Введите сумму';
    }
    if (parseFloat(value) < 1) {
        message = 'Минимальная сумма 1 ₽';
    }
    if (parseFloat(value) > 500000) {
        message = 'Максимальная сумма 500 000 ₽';
    }

    return message;
};

export default function Field (transmitValue) {
    const container = document.createElement('div');

    container.className = 'widget__field';

    container.innerHTML = template;

    const field = container.querySelector('#donation-amount');

    field.addEventListener('input', (e) => {
        field.parentNode.classList.remove('widget__field--error');

        let number = e.target.value.replace(/[^0-9,.]/g, '').substring(0, 9);

        field.value = number ? parseFloat(number, 10) : number;

        const error = errorMessage(field.value);

        if (error) {
            const messageBox = container.querySelector('#error-message');

            messageBox.innerHTML = error;

            window.dataLayer.push({
                event: 'validation.error',
                eventAction: error
            });

            field.parentNode.classList.add('widget__field--error');
        }

        transmitValue(field.value, error);
    });

    return {
        element: container,
        disable: () => {
            field.disabled = true;
            container.classList.add('widget__field--disabled');
        },
        enable: () => {
            field.disabled = false;
            container.classList.remove('widget__field--disabled');
        }
    };
}