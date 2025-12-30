import { register } from "@spoonkit/provider";
import { TransactionApi } from "./domain/Transaction/TransactionApi";
import { BudgetApi } from "./domain/Budget/BudgetApi";
import { PlanningApi } from "./domain/Planning/PlanningApi";

register(TransactionApi, new TransactionApi());
register(PlanningApi, new PlanningApi());
register(BudgetApi, new BudgetApi());
//register(ApiClient, new LocalStorageClient("app-data"));
