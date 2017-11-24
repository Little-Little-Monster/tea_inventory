<template>
  <div class="swith-bd" click>
    <div class="swith-cell" :class="{checked: checked}">
      <span class="swith-value"></span>
    </div>
  </div>
</template>
<script>
  export default{
    props: {
      checked: Boolean,
    },
  };
</script>
<style>
  .swith-bd {
    width: 0.46rem;
    height: 0.26rem;
    font-size: 0;
    display: inline-block;
  }

  .swith-cell {
    font-size: 0;
    border-radius: 0.32rem;
    border: 1px solid #d9d9d9;
    height: 0.32rem;
    padding: 1px;
    background: #d9d9d9;
    text-align: left;
  }

  .swith-cell.checked {
    background-color: #44DB5E;;
  }

  .swith-cell span {
    margin-left: 0;
    display: inline-block;
    width: 0.21rem;
    height: 0.22rem;
    border-radius: 50%;
    background-color: #fff;
    box-shadow: 0 1px 3px rgba(0, 0, 0, .4);
    transition: all .4s ease-in-out;
  }

  .swith-cell.checked span {
    margin-left: 0.2rem;
  }
</style>
