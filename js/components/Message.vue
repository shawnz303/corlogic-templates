<template>
  <div class="message" :class="{ hide: hidden }">
    <div class="message__inner">
      <div class="message__image">
        <i class="ico-info">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
            <g fill="none" fill-rule="evenodd">
              <g transform="translate(-11 -10)">
                  <rect width="520" height="36" fill="transparent" rx="4"/>
                  <path fill="#FFF" d="M17.38 22.006c-.213 0-.385-.201-.385-.448s.172-.448.385-.448L18 21v-3l-.62-.116c-.213 0-.385-.201-.385-.448s.172-.448.385-.448h2.514c.077 0 .102-.032.113-.058-.003.015-.007.029-.007.07v4l.619.11c.213 0 .386.201.386.448s-.173.448-.386.448H17.38zM18 14h.98c.007 0 .013-.004.02-.004.007 0 .013.004.02.004H20v.94c.001.022.012.04.012.061 0 .022-.011.04-.012.061V16h-.967c-.012.001-.022.007-.033.007-.012 0-.022-.006-.033-.007H18v-.939c-.002-.021-.013-.038-.013-.06 0-.021.011-.039.013-.06V14zm-7 4a8 8 0 1 0 16 0 8 8 0 0 0-16 0z" opacity=".7"/>
              </g>
            </g>
          </svg>
        </i>
      </div><!-- /.message__image -->

      <div class="message__content">
        <p>{{ content }}</p>
      </div><!-- /.message__content -->

      <div class="message__close">
        <a href="#" class="btn-close" @click="messageHide">
            <i class="ico-close"></i>
        </a>
      </div><!-- /.message__close -->
    </div><!-- /.message__inner -->
  </div><!-- /.message -->
</template>

<script>
  export default {
    data: () => ({
      hidden: false,
      content: 'Success!'
    }),
    methods: {
      messageHide() {
        this.hidden = true;
      }
    }
  };
</script>
