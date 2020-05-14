import './style.css';

export default function Forms (structure, classes = '') {
    const container = document.createElement('div');

    container.className = `${classes}`;

    let trigger = {};

    let components = [];

    let forms = structure.map((group, index) => {
        const form = document.createElement('div');

        form.className = 'widget__form-state';

        if (index > 0) {
            form.classList.add('hidden');
        }

        components.push({form: group.form, condition: group.condition});

        form.appendChild(group.form.element);

        if (group.triggerToNext) {
            trigger = group.triggerToNext;
            trigger.form = group.form;

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
            if (typeof trigger.enable === 'function') trigger.enable();
        },
        disable: () => {
            if (typeof trigger.disable === 'function') trigger.disable();
        },
        init: (data) => {
            component.enable();
            if (typeof trigger.init === 'function') trigger.init(data);
            components.forEach((component) => {
                component.form.init(data);

                if (component.form.element.children.length === 0) {
                    component.form.element.classList.add('hidden');

                    if (trigger.form === component.form) {
                        trigger.element.click();
                    }
                }
                console.log(component, data)
                if (typeof component.condition === 'function' && !component.condition(data.widgetStyles)) {
                    trigger.element.click();
                }
            });
        },
        dispose: (data) => {
            component.disable();
            if (typeof trigger.dispose === 'function') {
                trigger.dispose(data);
            }
            components.forEach((element) => {
                if (typeof element.form.dispose === 'function') {
                    element.form.dispose(data);
                }
            });
        }
    };

    return component;
}
