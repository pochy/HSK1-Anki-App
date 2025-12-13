<script lang="ts">
  import { page } from "$app/stores";
</script>

<nav
  class="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-30 w-full shadow-lg"
>
  <div class="grid grid-cols-3 h-16">
    <a
      href="/cards"
      class="flex flex-col items-center justify-center transition-all active:bg-gray-50 relative {$page.url.pathname.startsWith(
        '/cards'
      )
        ? 'text-primary font-bold bg-orange-50'
        : 'text-gray-400 hover:text-primary'}"
    >
      <i class="fas fa-layer-group text-xl mb-1"></i>
      <span class="text-xs font-medium">Cards</span>
    </a>
    <a
      href="/game"
      class="flex flex-col items-center justify-center transition-all active:bg-gray-50 relative {$page.url.pathname.startsWith(
        '/game'
      )
        ? 'text-primary font-bold bg-orange-50'
        : 'text-gray-400 hover:text-primary'}"
    >
      <i class="fas fa-gamepad text-xl mb-1"></i>
      <span class="text-xs font-medium">Game</span>
    </a>
    <a
      href="/list"
      class="flex flex-col items-center justify-center transition-all active:bg-gray-50 relative {$page.url.pathname.startsWith(
        '/list'
      )
        ? 'text-primary font-bold bg-orange-50'
        : 'text-gray-400 hover:text-primary'}"
    >
      <i class="fas fa-list text-xl mb-1"></i>
      <span class="text-xs font-medium">List</span>
    </a>
  </div>
</nav>
