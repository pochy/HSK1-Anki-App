import { redirect } from "@sveltejs/kit";
import { base } from "$app/paths";

export const load = () => {
  // static フォルダの legacy/index.html にリダイレクト
  throw redirect(302, `${base}/legacy/index.html`);
};
