import { register } from "@spoonkit/provider";
import { TransactionApi } from "./domain/Transaction/TransactionApi";

register(TransactionApi, new TransactionApi());
//register(ApiClient, new LocalStorageClient("app-data"));
