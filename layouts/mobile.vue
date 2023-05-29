<template>
  <div>
    <div style="display: flex;">
      <AppMobileMenu />
      <div style="flex: 1; position: relative;">
        <AppMobileHeader />
        <slot />
      </div>
    </div>
    <AppFooter />
  </div>
</template>
