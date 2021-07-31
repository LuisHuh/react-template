/**
 * @author <luisenriquehuhpuc@hotmail.com> Luis Enrique Huh Puc
 * @description Se importan y exportan las vistas para su uso en App.js
 */

export { default as Login } from "./login";
export { default as RecoverPassword } from "./forgotpass/RecoverPassword";
export { default as ResetPassword } from "./forgotpass/ResetPassword";
export { default as Signup } from "./signup";
export { default as MyWedding } from "./home";
export { default as RoomingList } from "./roominglist";
export { default as Prepayments } from "./prepayments";
export { default as DetailSheet } from "./detailsheet";
export { default as FamilyGift } from "./familygifts";
export { default as MyCart } from "./mycart";
export { default as MyWishList } from "./mywishlist";
export { default as WeddingExtras } from "./weddingextras";
export { default as GeneralInformation } from "./generalinfo";
export { default as BillingAddress } from "./billingaddress";
export { default as ChangePassword } from "./changepass";
export { default as CatalogView } from "./catalog";
export { default as BasicDetailsView } from "./catalog/views/BasicDetails";
export { default as AdvancedDetailsView } from "./catalog/views/AdvancedDetails";
export { default as EventView } from "./events";
export { default as TerminosView } from "./terminos";
export { default as GiftCard } from "./giftcard";
export { default as FormPreview } from "./temp/FormPreview";
export { default as CheckoutPreview } from "./temp/CheckoutPreview";
export { default as TodoList } from "./todo";

export * from "./payments";
export { Logout } from "../app/Auth";

// Errors page
export { default as e400 } from "./errors/404";
