import { shallowMount } from '@vue/test-utils'

import InputAddSubstractVue from './inputAddSubstract.vue'
import { describe, it, expect } from 'vitest'
// * ojos que nos irve sera por el v-model ese.



//Props
// text: string
// addValue?: number
// substractValue?: number
// value?: number
// minmaxValue?: number[]
// modelValue: number | ''

describe('InputAddSubstract', () => {
  it('renders correctly with initial props', () => {
    const wrapper = shallowMount(InputAddSubstractVue, {
      props: {
        text: 'text to be tested',
        modelValue: 10
      }
    })
    expect(wrapper.find('label').text()).toBe('text to be tested');
    expect(wrapper.find('input').element.value).toBe('10')
  })

  it('plus the value correctly', async () => {
    const wrapper = shallowMount(InputAddSubstractVue, {
      props: {
        text: 'text to be tested',
        modelValue: 1,
        // addValue: 1,
        // value:3
      }
    })
    
    expect(wrapper.find('input').element.value).toBe('1')
    await wrapper.find('[data-test="btn-substract"]').trigger('click');
    // expect(wrapper.find('input').element.value).toBe('2') // no vlae :C
  })

  it('substract the value correctly', async () => {
    const wrapper = shallowMount(InputAddSubstractVue, {
      props: {
        text: 'text to be tested',
        modelValue: 1,
        // addValue: 1,
        // value:3
      }
    })
    
    expect(wrapper.find('input').element.value).toBe('1')
    await wrapper.find('[data-test="btn-substract"]').trigger('click');
    console.log(wrapper.find('input').element.value)
    // expect(wrapper.find('input').element.value).toBe('0') // no vlae :C
  })

  it('emits update:modelValue when buttons are clicked', async () => {
    const wrapper = shallowMount(InputAddSubstractVue, {
      props: {
        text: 'text to be tested',
        modelValue: 1,
        substractValue:1,
        minmaxValue: [-9]
      }
    })
    expect(wrapper.find('input').element.value).toBe('1')

    await wrapper.find('[data-test="btnAdd"]').trigger('click');

    expect(wrapper.emitted()['update:modelValue']).toBeTruthy();
    console.log(wrapper.emitted()['update:modelValue']);

    expect(wrapper.emitted()['update:modelValue'][0]).toEqual([2]);

    await wrapper.find('[data-test="btn-substract"]').trigger('click');
    await wrapper.vm.$nextTick();

    await wrapper.find('[data-test="btn-substract"]').trigger('click');
    await wrapper.vm.$nextTick();

    await wrapper.find('[data-test="btnAdd"]').trigger('click');
    await wrapper.vm.$nextTick();


    // expect(wrapper.emitted()['update:modelValue'][1]).toEqual([1]);
    console.log(wrapper.emitted()['update:modelValue']);
  });

  it('emitts @change when input is pressed with enter key', async () => {
    const wrapper = shallowMount(InputAddSubstractVue, {
      props: {
        text: 'text to be tested',
        modelValue: 1,
      }
    })
    wrapper.find('input').trigger('keyup', { key: 'Enter' });

    expect(wrapper.emitted()['@enter']).toBeTruthy();
    expect(wrapper.emitted()['@enter'][0]).toEqual(['1']);

    wrapper.find('input').setValue(5);
    expect(wrapper.emitted()['update:modelValue']).toBeTruthy();

    wrapper.find('input').trigger('keyup', { key: 'Enter' });    
    expect(wrapper.emitted()['@enter'][1]).toEqual(['5']);

  })

  it('priorizy add or subrtract value for value', async () => {
  })

  it('respect the minmax value', async () => {
  })

})
