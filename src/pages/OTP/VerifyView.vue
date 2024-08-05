<template>
  <div class="bg-[#FAD4BD] flex justify-center items-center h-screen">
    <div class="verify__box bg-[#fff] w-[35%] p-[20px] text-center flex flex-col items-center rounded-lg">
      <img src="@/assets/images/email_5.jpg" class="w-[120px] h-[120px] mt-[30px] mb-[30px]" />
      <h3 class="text-[32px] font-semibold mb-[20px]">Verify Account</h3>
      <p class="mb-6 text-[#9E9E9E]">We have sent the verification code to your email address</p>
      <input class="w-[200px] h-[40px] border-2 border-[#9E9E9E] rounded-2xl text-center" placeholder="******" />
      <button class="verify__button mt-6 w-[200px] h-[40px] text-[#fff] bg-[#FB884B] font-semibold rounded-2xl mb-4">Confirm</button>
    </div>
  </div>
</template>

<style scoped lang="scss">
.verify {
  &__button {
    &:hover {
      background-color: #ffff;
      color: #fb884b;
      box-shadow:
        0 0 10px #fb884b,
        0 0 20px #fb884b;
    }
  }
  &__box{
    box-shadow: 0 0 5px #FB884B
  }
}
</style>
