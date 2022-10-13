import { mount } from '@vue/test-utils';
import ProductCard from '@/components/ProductCard.vue';
import { makeServer } from '@/miragejs/server';
import { CartManager } from '~/managers/CartManager';

const mountProductCard = () => {
  // eslint-disable-next-line no-undef
  const product = server.create('product', {
    title: 'Relógio bonito',
    price: '130.00',
    image: 'https://via.placeholder.com/150',
  });

  const cartManager = new CartManager();

  const wrapper = mount(ProductCard, {
    propsData: {
      product,
    },
    mocks: {
      $cart: cartManager,
    },
  });

  return {
    wrapper,
    product,
    cartManager,
  };
};

describe('Product card - unit', () => {
  let server;
  beforeEach(() => {
    server = makeServer({ environment: 'test' });
  });
  afterEach(() => {
    server.shutdown();
  });
  it('Should match snapshot', () => {
    const { wrapper } = mountProductCard();
    // console.log(wrapper.element)
    expect(wrapper.element).toMatchSnapshot();
  });

  it('should render the product card', () => {
    const { wrapper } = mountProductCard();

    expect(wrapper.vm).toBeDefined();
    expect(wrapper.text()).toContain('Relógio bonito');
    expect(wrapper.text()).toContain('130.00');
  });

  it('should add item to cartState on button click', async () => {
    const { wrapper, cartManager, product } = mountProductCard();
    const spy1 = jest.spyOn(cartManager, 'open');
    const spy2 = jest.spyOn(cartManager, 'addProduct');

    await wrapper.find('button').trigger('click');
    expect(spy1).toHaveBeenCalledTimes(1);
    expect(spy2).toHaveBeenCalledTimes(1);
    expect(spy2).toHaveBeenCalledWith(product);
  });
});
