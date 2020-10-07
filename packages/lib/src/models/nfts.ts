export class MintNftRequest {
  asset_manager_address:string;
  document_id:string
  proof_fields: string[];
  deposit_address: string;
  registry_address: string
}

export class TransferNftRequest {
  token_id:string;
  to: string;
  registry: string;
}

export class PushToOracleRequest {
  document_id: string;
  attribute_key: string;
  oracle_address: string;
  token_id: string;
}
