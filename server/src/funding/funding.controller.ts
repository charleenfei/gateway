import { Body, Controller, HttpException, Post, Request } from '@nestjs/common';
import { ROUTES } from '../../../src/common/constants';
import { DatabaseService } from '../database/database.service';
import { CentrifugeService } from '../centrifuge-client/centrifuge.service';
import { FundingRequest } from '../../../src/common/models/funding-request';
import {
  FunFundingCreatePayload,
  FunFundingResponse,
  NftNFTMintInvoiceUnpaidRequest,
} from '../../../clients/centrifuge-node';

@Controller(ROUTES.FUNDING)
export class FundingController {
  constructor(
    private readonly databaseService: DatabaseService,
    private readonly centrifugeService: CentrifugeService,
  ) {
  }

  @Post('')
  async create(@Body() fundingRequest: FundingRequest, @Request() req): Promise<FunFundingResponse | null> {


    const nftPayload: NftNFTMintInvoiceUnpaidRequest = {
      identifier: fundingRequest.document_id,
      deposit_address: fundingRequest.wallet_address,
    };

    // Mint and UnpaidNFT. THis will fail if the document already has a nft minted
    const nftResult = await this.centrifugeService.nft.mintInvoiceUnpaidNFT(fundingRequest.document_id, nftPayload, req.user.account).then(response => {
      return response;
    }).catch(async error => {
      throw new HttpException(await error.json(), error.status);
    });

    // Pull to see when minting is complete. We need the token ID for the funding API
    await this.centrifugeService.pullForJobComplete(nftResult.header.job_id, req.user.account);
    // Get the new invoice data in order to get the NFT ID
    const updatedInvoice = await this.centrifugeService.invoices.get(fundingRequest.document_id, req.user.account);
    const tokenId = updatedInvoice.header.nfts[0].token_id;
    // Update the document in the database
    // TODO this will not be necesary if we implement JOB context, in the node or in Gateway
    await this.databaseService.invoices.update(
      { 'header.document_id': fundingRequest.document_id },
      {...updatedInvoice,ownerId: req.user._id,},
    );
    // Create funding payload
    const payload: FunFundingCreatePayload = {
      write_access: {
        collaborators: [fundingRequest.funder],
      },
      data: {
        amount: fundingRequest.amount.toString(),
        apr: fundingRequest.apr.toString(),
        days: fundingRequest.days.toString(),
        fee: fundingRequest.fee.toString(),
        repayment_due_date: fundingRequest.repayment_due_date,
        repayment_amount: fundingRequest.repayment_amount.toString(),
        currency: fundingRequest.currency,
        nft_address: tokenId,
      },
    };

    const fundingResult = await this.centrifugeService.funding.create(fundingRequest.document_id, payload, req.user.account).then(response => {
      return response;
    }).catch(async error => {
      throw new HttpException(await error.json(), error.status);
    });
    // Pull to see of the funding request has been created
    // THis will not be necesary when we implement JOb context and keep Job Status for documents
    const fundingComplete = await this.centrifugeService.pullForJobComplete(fundingResult.header.job_id, req.user.account);
    return fundingResult;
  }
}