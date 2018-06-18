import './style.css';

export default function PaymentIcons () {
    const paymentIcons = document.createElement('div');

    paymentIcons.className = 'widget__payment-block';

    paymentIcons.innerHTML = `
            <div class="widget__payment-type widget__payment-block-visa"></div>
            <div class="widget__payment-type widget__payment-block-master-card"></div>
            <div class="widget__payment-type widget__payment-block-mir"></div>
            <div class="widget__payment-type widget__payment-block-qiwi"></div>`;

    return {
        element: paymentIcons
    };
}
