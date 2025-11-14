import { register } from "@spoonkit/provider";
import { TransactionApi } from "./domain/Transaction/TransactionApi";
import { BudgetApi } from "./domain/Budget/BudgetApi";

register(TransactionApi, new TransactionApi());
register(BudgetApi, new BudgetApi());
//register(ApiClient, new LocalStorageClient("app-data"));
