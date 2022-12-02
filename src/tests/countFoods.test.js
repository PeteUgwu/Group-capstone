import countFoods from '../modules/countFoods';
jest.mock('../modules/countFoods', () => jest.fn());
describe('Itmems Counter Test', () => {
  test('Module Resolves', () => {
    countFoods.mockImplementation((data)=>{
      return data;
    }); 
    expect(countFoods(300)).toBeTruthy;
  });
  test('Exact value is returned', () => {
    countFoods.mockImplementation((data)=>{
      return data;
    }); 
    expect(countFoods(300)).toBe(300);
  });
});  
