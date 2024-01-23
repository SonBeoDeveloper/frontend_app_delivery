const CARD_TYPES = {
  MY_CARD: [
    {
      id: 1,
      name: 'COD',
      image: require('../assets/images/payment.jpg'),
    },
  ],
  fromLocs: [
    {
      id: 1,
      name: 'Điểm xuất phát 1',
      latitude: 1.5496614931250608,
      longitude: 110.36381866919922,
    },
    {
      id: 2,
      name: 'Điểm xuất phát 2',
      latitude: 1.5496614931250685,
      longitude: 110.36381866919922,
    },
  ],
  ALL_CARD: [
    {
      id: 2,
      name: 'Visa',
      image: require('../assets/images/Visa.png'),
    },
    {
      id: 3,
      name: 'Apple pay',
      image: require('../assets/images/applePay.png'),
    },
    {
      id: 4,
      name: 'Paypal',
      image: require('../assets/images/Paypal.jpg'),
    },
    {
      id: 5,
      name: 'MasterCard',
      image: require('../assets/images/mastercard.png'),
    },
    {
      id: 6,
      name: 'GooglePay',
      image: require('../assets/images/google.png'),
    },
  ],
};
export default {CARD_TYPES};
