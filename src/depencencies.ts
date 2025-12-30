import { register } from "@spoonkit/provider";
import { TransactionApi } from "./domain/Transaction/TransactionApi";
import { BudgetApi } from "./domain/Budget/BudgetApi";
import { PlaningApi } from "./domain/Planing/PlaningApi";

register(TransactionApi, new TransactionApi());
register(PlaningApi, new PlaningApi());
register(BudgetApi, new BudgetApi());
//register(ApiClient, new LocalStorageClient("app-data"));
