<script lang="ts">
  export let text = "Header";
</script>

<h1 class="header">{text}</h1>

<style lang="scss">
  $window-radius: 8pt;

  h1.header {
    padding: 8pt 8pt;
    transform: translateY(1px);

    font-size: 18px;
    font-weight: 400;

    text-align: center;

    border-radius: $window-radius $window-radius 0pt 0pt;

    background: rgb(14, 14, 14);
    color: rgb(200, 200, 200);
  }
</style>
