import { IAddressesController } from './IAddressesController'
import { IBannersController } from './IBannersController'
import { IBrandsController } from './IBrandsService'
import { ICategoriesController } from './ICategoriesService'
import { ICheckoutController } from './ICheckoutController'
import { ICollectionsController } from './ICollectionsService'
import { ICommentsController } from './ICommentsService'
import { ICustomersController } from './ICustomersController'
import { IDiscountsController } from './IDiscountsController'
import { ILeadsController } from './ILeadsController'
import { IOrdersController } from './IOrdersController'
import { IProductsController } from './IProductsService'
import { IReviewsController } from './IReviewsService'
import { IShipmentServiceController } from './IShipmentServiceController'
import { ISkusController } from './ISkusService'
import { IVariationsController } from './IVariationsService'

export interface IApi
  extends IAddressesController,
    IBannersController,
    IBrandsController,
    ICategoriesController,
    ICommentsController,
    ICollectionsController,
    ICustomersController,
    IDiscountsController,
    IOrdersController,
    ILeadsController,
    IProductsController,
    IReviewsController,
    IShipmentServiceController,
    ISkusController,
    IVariationsController,
    ICheckoutController {
  handleError<Error>(error: unknown): Error
}
