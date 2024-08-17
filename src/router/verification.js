const verification = [
  {
    path: '/verification/:email',
    name: 'verification',
    component: () => import('../pages/OTP/VerifyView.vue')
  }
];

export default verification;