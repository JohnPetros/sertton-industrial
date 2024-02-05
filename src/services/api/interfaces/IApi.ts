import { IAdressesController } from './IAddressesController'
import { IBannersController } from './IBannersController'
import { IBrandsController } from './IBrandsService'
import { ICategoriesController } from './ICategoriesService'
import { ICheckoutController } from './ICheckoutController'
import { ICollectionsController } from './ICollectionsService'
import { ICommentsController } from './ICommentsService'
import { ICreditCardController } from './ICreditCardController'
import { ICustomersController } from './ICustomersController'
import { ILeadsController } from './ILeadsController'
import { IOrdersController } from './IOrdersController'
import { IPaymentController } from './IPaymentController'
import { IProductsController } from './IProductsService'
import { IReviewsController } from './IReviewsService'
import { IShipmentServiceController } from './IShipmentServiceController'
import { ISkusController } from './ISkusService'
import { IVariationsController } from './IVariationsService'

export interface IApi
  extends IAdressesController,
    IBannersController,
    IBrandsController,
    ICategoriesController,
    ICommentsController,
    ICollectionsController,
    ICustomersController,
    IOrdersController,
    ILeadsController,
    IProductsController,
    IReviewsController,
    IShipmentServiceController,
    ISkusController,
    IVariationsController,
    ICheckoutController,
    ICreditCardController,
    IPaymentController {
  handleError<Error>(error: unknown): Error
}
