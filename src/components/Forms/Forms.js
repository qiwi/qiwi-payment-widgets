import './style.css';

export default function Forms (structure, classes = '') {
    const container = document.createElement('div');

    container.className = `${classes}`;

    let trigger = {};

    let forms = structure.map((group, index) => {
        const form = document.createElement('div');

        form.className = 'widget__form-state';

        if (index > 0) {
            form.classList.add('hidden');
        }

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

    return {
        element: container,
        enable: () => {
            trigger.element.disabled = false;
        },
        disable: () => {
            trigger.element.disabled = true;
        }
    };
}
