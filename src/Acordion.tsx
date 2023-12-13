import styled from "styled-components"
import  Mark from "./assets/markTransport.svg"
import Arrow from "./assets/arrow.svg"
import { useState } from "react"

const transportOnField = [
    {
        name: "Уборочная техника",
        item: [
            {
                serialId: 8765,
                article: "BELARUS-1221Т.2"
            },
            {
                serialId: 8765,
                article: "К-735М"
            }
        ]
    },
    {
        name: "Уборочная техника",
        item: [
            {
                serialId: 8765,
                article: "BELARUS-1221Т.2"
            },
            {
                serialId: 8765,
                article: "К-735М"
            }
        ]
    },
     {
        name: "Уборочная техника",
        item: [
            {
                serialId: 8765,
                article: "BELARUS-1221Т.2"
            },
            {
                serialId: 8765,
                article: "К-735М"
            }
        ]
    },
    {
        name: "Уборочная техника",
        item: [
            {
                serialId: 8765,
                article: "BELARUS-1221Т.2"
            },
            {
                serialId: 8765,
                article: "К-735М"
            }
        ]
    },
]

const Accoddion = styled.ul`
    padding: 10px;
    list-style-type: none;
    margin: 0;
    /* padding: 0; */
    border-bottom: 1px solid #E9EDF5;
    background-color: white;
`
const AccoddionHeader = styled.div`
    display: flex;
    box-sizing: border-box;
    position: relative;
    width: 100%;
    
    padding: 4px 10px;
    align-items: center;
    justify-content: space-between;
`

const Checkbox = styled.input`
    margin: 0;
    width: 16px;
    height: 16px;
    fill:  #5E5ADB;
    filter: drop-shadow(0px 0px 0px #5E5ADB) drop-shadow(0px 1px 1px rgba(0, 0, 0, 0.10));
`

const BoxIcon = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 39px;
    font-size: 12px;
    path{
        fill: black ;
    }
`

const HeaderBox = styled.div`
    align-items: center;
    display: flex;
    height: 20px;
`

const NameTransport = styled.div`
    color: #151357;
    font-variant-numeric: lining-nums tabular-nums;
    font-family: Inter;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 20px; 
`
const Tab = styled.div`
    width: 16px;
    height: 16px;
`

const OpenWrapper = styled.div<{open: string}>`
    /* background-color: blue; */
    height: ${({open}) => open};
    overflow: hidden;
    transition: height 0.3s ease;
`
export const Acordion = () => {

    const [openId, setOpenId] = useState(null)

    const clickHandler = (id: any) => {
        if(id === openId){
            setOpenId(null)
        } else {
            setOpenId(id)
        } 

    }
    return(
        <>
            {transportOnField.map((i, id) => {
                return(
                    <Accoddion>
                        <AccoddionHeader onClick={() => clickHandler(id)}>
                            <HeaderBox>
                                <Checkbox type="checkbox"></Checkbox>
                                <BoxIcon>
                                    <Mark/>
                                </BoxIcon>
                                <NameTransport>{i.name}</NameTransport>
                            </HeaderBox>
                            <Arrow/>
                        </AccoddionHeader>
                        <OpenWrapper open={openId == id ? "100px" : "0px"}>
                            {i.item.map(n => {
                                return(
                                    <AccoddionHeader>
                                        <HeaderBox>
                                            <Tab></Tab>
                                            <BoxIcon>
                                                <div>{n.serialId}</div>
                                            </BoxIcon>
                                            <NameTransport>
                                                <div>{n.article}</div>
                                            </NameTransport>
                                        </HeaderBox>
                                    </AccoddionHeader>
                                )
                            })}
                        </OpenWrapper>
                    </Accoddion>
                )
            })}
        </>
    )
}