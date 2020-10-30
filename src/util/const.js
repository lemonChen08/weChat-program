export const OilTypes = {
    GASOLINE: 1, // 汽油
    DIESEL: 2, // 柴油
    GAS: 3 // 天然气
}
export const oilTypeArray = [
  { value: OilTypes.GASOLINE, key: '汽油' },
  { value: OilTypes.DIESEL, key: '柴油' },
  { value: OilTypes.GAS, key: '天然气' }
]
// 全部油号
export const gasolineNumbers = ['90', '92', '95', '98', '101']
export const dieselNumbers = ['-40', '-35', '-30', '-20', '-10', '国四', '0']
export const gasNumbers = ['CNG', 'LNG']
export const GasStationBrands = {
  CNPC: 1, // 中石油
  SG: 2, // 中石化
  RDSGC: 3, // 壳牌 
  OTHERS: 4 // 其他
}
export const gasStationBrandArray = [
  { value: GasStationBrands.CNPC, key: '中石油' },
  { value: GasStationBrands.SG, key: '中石化' },
  { value: GasStationBrands.RDSGC, key: '壳牌' },
  { value: GasStationBrands.OTHERS, key: '其他' }
]
// 加油站来源
export const GasStationSource = {
    CZB: 1, // 车主邦数据
    YJY: 2, // 易加油数据
    SHENGXIN: 3 // 省心加油站
}
export const GhyyOrderStatuses = {
    CREATE: 1, // 未支付
    FINISH: 2, // 已支付
    CANCELED: 3 // 已取消
  }