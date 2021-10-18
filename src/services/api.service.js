import { API_URL } from "../constants/env.constant";
import  {Fetch} from "./Fetch";

// Fetch function takes three arrguments method url and data
// for e.g : Fetch(method, url, data)
// data is ptional and other is mandatory

const login = (data) => Fetch("post", `${API_URL}/admin/login`,data);
const getCategory = () => Fetch("get", `${API_URL}/category/get`);
const addCategory = (data) => Fetch("post", `${API_URL}/category/add`, data);
const updateCategory = (data) => Fetch("put", `${API_URL}/category/update`, data);
const deleteCategory = (id) => Fetch("get", `${API_URL}/category/delete/${id}`);
const getUser = (data) => Fetch("post", `${API_URL}/user/getUsers`, data);
const updateUser = (data) => Fetch("post", `${API_URL}/admin/userUpdate`, data);
const getTransaction = (data) => Fetch("post", `${API_URL}/transaction/getTransactionList`, data);
const getNft = (data) => Fetch("post", `${API_URL}/nft/getList`, data);
const getNftDetails = (id) => Fetch("get", `${API_URL}/nft/adminGetNFT/${id}`);
const getCollection = (data) => Fetch("post", `${API_URL}/collection/adminGetCollection`, data);
const deleteCollection = (id) => Fetch("get", `${API_URL}/collection/adminDeleteCollection/${id}`);
const updateCollection = (data) => Fetch("post", `${API_URL}/collection/adminUpdateCollection`, data);

const getSellNft = (data) => Fetch("post", `${API_URL}/sell/getAll`, data);
const deleteSellNft = (id) => Fetch("get", `${API_URL}/sell/delete/${id}`);


// exporting api calls

export const ApiService = {
  login,
  getCollection,
  deleteCollection,
  updateCollection,
  getUser,
  getSellNft,
  deleteSellNft,
  getNftDetails,
  getTransaction,
  updateUser,
  getNft,
  deleteCategory,
  addCategory,
  getCategory,
  updateCategory
};


