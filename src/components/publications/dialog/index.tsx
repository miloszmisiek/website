import { Body } from "./Body";
import { PublicationAbstractDialog as PublicationAbstractDialogProvider } from "./context";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { Panel } from "./Panel";
import { Trigger } from "./Trigger";

export const PublicationAbstractDialog = {
  Root: PublicationAbstractDialogProvider,
  Trigger,
  Panel,
  Footer,
  Body,
  Header,
};
