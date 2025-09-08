export interface SubgraphConfig {
  name: string;
  url: string;
}

export const subgraphs: SubgraphConfig[] = [
  {
    name: 'data-provider',
    url: process.env.DATA_PROVIDER_URL || 'http://localhost:3000/graphql',
  },
  // Adicione outros subgraphs aqui conforme necessário
  // {
  //   name: 'user-service',
  //   url: process.env.USER_SERVICE_URL || 'http://localhost:3001/graphql',
  // },
  // {
  //   name: 'product-service', 
  //   url: process.env.PRODUCT_SERVICE_URL || 'http://localhost:3002/graphql',
  // },
];

export const getSubgraphList = () => {
  return subgraphs.map(subgraph => ({
    name: subgraph.name,
    url: subgraph.url,
  }));
};

