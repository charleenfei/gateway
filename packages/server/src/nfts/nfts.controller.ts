import { Body, Controller, Param, Post, Req, UseGuards } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { CentrifugeService } from '../centrifuge-client/centrifuge.service';
import {
  CoreapiMintNFTRequest,
  OraclePushAttributeToOracleRequest, OraclePushToOracleResponse
} from '@centrifuge/gateway-lib/centrifuge-node-client';
import {Document, DocumentRequest, NftStatus} from '@centrifuge/gateway-lib/models/document';
import { MintNftRequest } from '@centrifuge/gateway-lib/models/nfts';
import { ROUTES } from '@centrifuge/gateway-lib/utils/constants';
import { SessionGuard } from '../auth/SessionGuard';


@Controller(ROUTES.NFTS)
@UseGuards(SessionGuard)
export class NftsController {
  constructor(
      private readonly databaseService: DatabaseService,
      private readonly centrifugeService: CentrifugeService,
  ) {
  }

  /**
   * Mints a NFT for a document
   * @async
   * @param {Param} request - the http request
   * @param {MintNftRequest} body - minting information
   * @return {Promise<DocumentRequest>} result
   */
  @Post('/mint')
  async mintNFT(
      @Req() request,
      @Body() body: MintNftRequest,
  ) {
    const payload: CoreapiMintNFTRequest = {
      // @ts-ignore
      asset_manager_address: body.asset_manager_address,
      document_id: body.document_id,
      proof_fields: body.proof_fields,
      deposit_address: body.deposit_address,
    };

    const mintingResult: Document = await this.centrifugeService.nft.mintNft(
        request.user.account,
        body.registry_address,
        payload,
    );
    console.log(mintingResult)

    const doc = await this.databaseService.documents.findOne(
        {'header.document_id': mintingResult.document_id},
    );
    console.log('here is your document', doc)
    await this.databaseService.documents.updateById(doc._id, {
      $set: {
        nft_status: NftStatus.Minting,
      },
    });
    // @ts-ignore
    const mint = await this.centrifugeService.pullForJobComplete(mintingResult.header.job_id, request.user.account);

    if (mint.status === 'success') {
      return await this.databaseService.documents.updateById(doc._id, {
        $set: {
          nft_status: NftStatus.Minted,
        },
      });

      // return await this.centrifugeService.nft.pushAttributeOracle(request.user.account, {
      //   // @ts-ignore
      //   attribute_key: '',
      //   oracle_address: doc.attributes.oracle_address,
      //   token_id: 'INSERT TOKEN ID HERE',
      // }, doc.document_id)
    } else {
      return await this.databaseService.documents.updateById(doc._id, {
        $set: {
          nft_status: NftStatus.MintingFail,
        },
      });
    }
  }
}
