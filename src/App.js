// import { mount, flushPromises } from '@vue/test-utils'
// import App from './App.vue'
// import { describe, it, expect, vi } from 'vitest'
// const IMAGE_CAT_ENPOINT = 'https://cataas.com/cat/says/'

// const CAT_ENPOINT_FACT = 'https://catfact.ninja/fact'

// const mockFact = {
//   "fact": "A cats heart beats nearly twice as fast as a human heart, at 110 to 140 beats a minute.",
//   "length": 88
// }

// describe('App', () => {
//   it('all render', () => {
//     const wrapper = mount(App)  
//     const title = wrapper.find('h1')  
//     expect(title.exists()).toBeTruthy()
//     expect(title.text()).toBe('Gatos')
//     expect(wrapper.find('button').exists()).toBeTruthy()
//     expect(wrapper.find('p').exists()).toBeTruthy()
//     expect(wrapper.find('img').exists()).toBeTruthy()
  
//     })

//     it('verify fetch', async () => {
//       // const originalFetch = window.fetch;
//       const spy = vi.spyOn(window, 'fetch')
//         .mockImplementationOnce(() => Promise.resolve({
//           json: () => Promise.resolve(mockFact)
//         }));

//       const wrapper = mount(App);

//       expect(spy).toHaveBeenCalledWith(CAT_ENPOINT_FACT)
//       expect(spy).toHaveReturnedTimes(1)

//       await flushPromises();

//       const textP = wrapper.find('p').text()
//       expect(textP).toContain(mockFact.fact);

//       const firsWord = textP.split(' ', 1).join('')
//       const imgSrc = wrapper.find('img').attributes('src')
//       expect(`${IMAGE_CAT_ENPOINT}${firsWord}1`).toBe(imgSrc)

//       await wrapper.get('button').trigger('click')
//       await flushPromises();
//       // expect(spy).toHaveReturnedTimes(2)
//       expect(wrapper.find('p').text().length).toBeGreaterThan(0)
//       // window.fetch = originalFetch;
//     });

// })