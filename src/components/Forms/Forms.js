import './style.css';

export default function Forms (structure, classes = '') {
    const container = document.createElement('div');

    container.className = `${classes}`;

    let trigger = {};

    let components = [];

    let forms = structure.map((group, index) => {
        const form = document.createElement('div');

        console.log(group);
        form.className = 'widget__form-state';

        if (index > 0) {
            form.classList.add('hidden');
        }

        components.push(group.form);

        form.appendChild(group.form.element);

        if (group.triggerToNext) {
            trigger = group.triggerToNext;

            group.triggerToNext.element.disabled = true;

            form.appendChild(group.triggerToNext.element);

            group.triggerToNext.element.addEventListener('click', () => {
                forms.forEach((form) => form.classList.add('hidden'));
                if (forms[index + 1]) {
                    forms[index + 1].classList.remove('hidden');
                }
            });
        }

        container.appendChild(form);

        return form;
    });

    const component = {
        element: container,
        enable: () => {
            trigger.element.disabled = false;
        },
        disable: () => {
            trigger.element.disabled = true;
        },
        onSuccess: (data) => {
            component.enable();
            if (trigger.changeBackgroundColor && data.merchant_button_color) {
                trigger.changeBackgroundColor(data.merchant_button_color);
            }
            components.forEach((element) => {
                if (element.onSuccess) {
                    element.onSuccess(data);
                }
            });
        },
        onError: (data) => {
            component.disable();

            components.forEach((element) => {
                if (element.onError) {
                    element.onError(data);
                }
            });
        }
    };

    return component;
}
