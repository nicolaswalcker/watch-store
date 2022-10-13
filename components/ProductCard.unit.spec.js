import { mount } from '@vue/test-utils';
import ProductCard from '@/components/ProductCard.vue';
import { makeServer } from '@/miragejs/server';
import { cartState } from '@/state';

const mountProductCard = () => {
  // eslint-disable-next-line no-undef
  const product = server.create('product', {
    title: 'Relógio bonito',
    price: '130.00',
    image: 'https://via.placeholder.com/150',
  });

  return {
    wrapper: mount(ProductCard, {
      propsData: {
        product,
      },
    }),
    product,
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

  xit('should add item to cartState on button click', async () => {
    const { wrapper } = mountProductCard();

    await wrapper.find('button').trigger('click');
    expect(cartState.items).toHaveLength(1);
  });
});
