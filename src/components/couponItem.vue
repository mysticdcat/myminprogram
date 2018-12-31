<template>
    <div class="shop-item"
        :class="{
            'shop-item-hover': isTouched,
            'shop-bg-normal': category === 'normal',
            'shop-bg-used': category === 'used',
            'shop-bg-expired': category === 'expired'
        }"
        @touchstart="handleTouchStart"
        @touchend="handleTouchEnd"
    >
        <div class="shop-card-wrap" @click="handleClick">
            <div class="shop-card-image">
                <image :src="image" mode="aspectFill" style="width: 150rpx; height: 150rpx;" />
            </div>
            <div class="shop-card-desc">
                <p class="shop-card-name ellipsis">{{title}}</p>
                <p class="shop-card-expired">有效期：{{start_at}} ~ {{end_at}}</p>
                <div class="shop-info">
                    <div>
                        <div class="shop-price" v-if="type === 1" :style="{color: fontColor}">
                            {{ value }}
                            <span style="font-size: 25rpx;">元</span>
                        </div>

                        <div class="shop-price" v-if="type === 2" :style="{color: fontColor}">
                            {{ value * 100 }}
                            <span style="font-size: 25rpx;">折</span>
                        </div>

                        <div class="shop-tag">
                            <coupon-tag v-if="type === 1" />
                            <coupon-tag v-if="type === 2"  text="折扣劵" background-color="#FDFFE8" border-color="#FFF175" font-color="#FF9D14" />
                        </div>

                    </div>
                    <div>
                        <div class="shop-other">
                            <div class="shop-other-btn" :style="{background: btnColor}">{{text}}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <p class="shop-title" @click="showMap">
            <span><i-icon type="coordinates" size="30" />{{ distance }}</span>
            <i-icon type="shop_fill" size="32" />{{name}}
        </p>
    </div>

</template>

<style lang="less" scoped>
.shop {
    &-bg-normal {
        &:after {
            content: '';
            display: block;
            width: 100%;
            height: 20rpx;
            background: #f7f7f7;
        }
    }
    &-bg-used {
        background-color: RGBA(255, 244, 244, .5);
        background-image: url('data:image/png;base64,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');
        background-position: 75% 20%;
        background-size: 28%;
        background-repeat: no-repeat;

        &:after {
            content: '';
            display: block;
            width: 100%;
            height: 20rpx;
            background: #fff;
        }
    }
    &-bg-expired {
        background-color: #f7f7f7;
        background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAABkCAYAAABO6zhfAAAACXBIWXMAAAsTAAALEwEAmpwYAAAKTWlDQ1BQaG90b3Nob3AgSUNDIHByb2ZpbGUAAHjanVN3WJP3Fj7f92UPVkLY8LGXbIEAIiOsCMgQWaIQkgBhhBASQMWFiApWFBURnEhVxILVCkidiOKgKLhnQYqIWotVXDjuH9yntX167+3t+9f7vOec5/zOec8PgBESJpHmomoAOVKFPDrYH49PSMTJvYACFUjgBCAQ5svCZwXFAADwA3l4fnSwP/wBr28AAgBw1S4kEsfh/4O6UCZXACCRAOAiEucLAZBSAMguVMgUAMgYALBTs2QKAJQAAGx5fEIiAKoNAOz0ST4FANipk9wXANiiHKkIAI0BAJkoRyQCQLsAYFWBUiwCwMIAoKxAIi4EwK4BgFm2MkcCgL0FAHaOWJAPQGAAgJlCLMwAIDgCAEMeE80DIEwDoDDSv+CpX3CFuEgBAMDLlc2XS9IzFLiV0Bp38vDg4iHiwmyxQmEXKRBmCeQinJebIxNI5wNMzgwAABr50cH+OD+Q5+bk4eZm52zv9MWi/mvwbyI+IfHf/ryMAgQAEE7P79pf5eXWA3DHAbB1v2upWwDaVgBo3/ldM9sJoFoK0Hr5i3k4/EAenqFQyDwdHAoLC+0lYqG9MOOLPv8z4W/gi372/EAe/tt68ABxmkCZrcCjg/1xYW52rlKO58sEQjFu9+cj/seFf/2OKdHiNLFcLBWK8ViJuFAiTcd5uVKRRCHJleIS6X8y8R+W/QmTdw0ArIZPwE62B7XLbMB+7gECiw5Y0nYAQH7zLYwaC5EAEGc0Mnn3AACTv/mPQCsBAM2XpOMAALzoGFyolBdMxggAAESggSqwQQcMwRSswA6cwR28wBcCYQZEQAwkwDwQQgbkgBwKoRiWQRlUwDrYBLWwAxqgEZrhELTBMTgN5+ASXIHrcBcGYBiewhi8hgkEQcgIE2EhOogRYo7YIs4IF5mOBCJhSDSSgKQg6YgUUSLFyHKkAqlCapFdSCPyLXIUOY1cQPqQ28ggMor8irxHMZSBslED1AJ1QLmoHxqKxqBz0XQ0D12AlqJr0Rq0Hj2AtqKn0UvodXQAfYqOY4DRMQ5mjNlhXIyHRWCJWBomxxZj5Vg1Vo81Yx1YN3YVG8CeYe8IJAKLgBPsCF6EEMJsgpCQR1hMWEOoJewjtBK6CFcJg4Qxwicik6hPtCV6EvnEeGI6sZBYRqwm7iEeIZ4lXicOE1+TSCQOyZLkTgohJZAySQtJa0jbSC2kU6Q+0hBpnEwm65Btyd7kCLKArCCXkbeQD5BPkvvJw+S3FDrFiOJMCaIkUqSUEko1ZT/lBKWfMkKZoKpRzame1AiqiDqfWkltoHZQL1OHqRM0dZolzZsWQ8ukLaPV0JppZ2n3aC/pdLoJ3YMeRZfQl9Jr6Afp5+mD9HcMDYYNg8dIYigZaxl7GacYtxkvmUymBdOXmchUMNcyG5lnmA+Yb1VYKvYqfBWRyhKVOpVWlX6V56pUVXNVP9V5qgtUq1UPq15WfaZGVbNQ46kJ1Bar1akdVbupNq7OUndSj1DPUV+jvl/9gvpjDbKGhUaghkijVGO3xhmNIRbGMmXxWELWclYD6yxrmE1iW7L57Ex2Bfsbdi97TFNDc6pmrGaRZp3mcc0BDsax4PA52ZxKziHODc57LQMtPy2x1mqtZq1+rTfaetq+2mLtcu0W7eva73VwnUCdLJ31Om0693UJuja6UbqFutt1z+o+02PreekJ9cr1Dund0Uf1bfSj9Rfq79bv0R83MDQINpAZbDE4Y/DMkGPoa5hpuNHwhOGoEctoupHEaKPRSaMnuCbuh2fjNXgXPmasbxxirDTeZdxrPGFiaTLbpMSkxeS+Kc2Ua5pmutG003TMzMgs3KzYrMnsjjnVnGueYb7ZvNv8jYWlRZzFSos2i8eW2pZ8ywWWTZb3rJhWPlZ5VvVW16xJ1lzrLOtt1ldsUBtXmwybOpvLtqitm63Edptt3xTiFI8p0in1U27aMez87ArsmuwG7Tn2YfYl9m32zx3MHBId1jt0O3xydHXMdmxwvOuk4TTDqcSpw+lXZxtnoXOd8zUXpkuQyxKXdpcXU22niqdun3rLleUa7rrStdP1o5u7m9yt2W3U3cw9xX2r+00umxvJXcM970H08PdY4nHM452nm6fC85DnL152Xlle+70eT7OcJp7WMG3I28Rb4L3Le2A6Pj1l+s7pAz7GPgKfep+Hvqa+It89viN+1n6Zfgf8nvs7+sv9j/i/4XnyFvFOBWABwQHlAb2BGoGzA2sDHwSZBKUHNQWNBbsGLww+FUIMCQ1ZH3KTb8AX8hv5YzPcZyya0RXKCJ0VWhv6MMwmTB7WEY6GzwjfEH5vpvlM6cy2CIjgR2yIuB9pGZkX+X0UKSoyqi7qUbRTdHF09yzWrORZ+2e9jvGPqYy5O9tqtnJ2Z6xqbFJsY+ybuIC4qriBeIf4RfGXEnQTJAntieTE2MQ9ieNzAudsmjOc5JpUlnRjruXcorkX5unOy553PFk1WZB8OIWYEpeyP+WDIEJQLxhP5aduTR0T8oSbhU9FvqKNolGxt7hKPJLmnVaV9jjdO31D+miGT0Z1xjMJT1IreZEZkrkj801WRNberM/ZcdktOZSclJyjUg1plrQr1zC3KLdPZisrkw3keeZtyhuTh8r35CP5c/PbFWyFTNGjtFKuUA4WTC+oK3hbGFt4uEi9SFrUM99m/ur5IwuCFny9kLBQuLCz2Lh4WfHgIr9FuxYji1MXdy4xXVK6ZHhp8NJ9y2jLspb9UOJYUlXyannc8o5Sg9KlpUMrglc0lamUycturvRauWMVYZVkVe9ql9VbVn8qF5VfrHCsqK74sEa45uJXTl/VfPV5bdra3kq3yu3rSOuk626s91m/r0q9akHV0IbwDa0b8Y3lG19tSt50oXpq9Y7NtM3KzQM1YTXtW8y2rNvyoTaj9nqdf13LVv2tq7e+2Sba1r/dd3vzDoMdFTve75TsvLUreFdrvUV99W7S7oLdjxpiG7q/5n7duEd3T8Wej3ulewf2Re/ranRvbNyvv7+yCW1SNo0eSDpw5ZuAb9qb7Zp3tXBaKg7CQeXBJ9+mfHvjUOihzsPcw83fmX+39QjrSHkr0jq/dawto22gPaG97+iMo50dXh1Hvrf/fu8x42N1xzWPV56gnSg98fnkgpPjp2Snnp1OPz3Umdx590z8mWtdUV29Z0PPnj8XdO5Mt1/3yfPe549d8Lxw9CL3Ytslt0utPa49R35w/eFIr1tv62X3y+1XPK509E3rO9Hv03/6asDVc9f41y5dn3m978bsG7duJt0cuCW69fh29u0XdwruTNxdeo94r/y+2v3qB/oP6n+0/rFlwG3g+GDAYM/DWQ/vDgmHnv6U/9OH4dJHzEfVI0YjjY+dHx8bDRq98mTOk+GnsqcTz8p+Vv9563Or59/94vtLz1j82PAL+YvPv655qfNy76uprzrHI8cfvM55PfGm/K3O233vuO+638e9H5ko/ED+UPPR+mPHp9BP9z7nfP78L/eE8/sl0p8zAAAAIGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAB6WSURBVHja7J17vFXT2se/XYnq6KKolEiJikqqg0RCKQqvyCG3JE7kUpJbIuq4pTeUiNct0emkEgqhQoiESilUyCXtEl3l/DF+48yx555rrXnbqzjv8/nsz95r7bXmHHOO5/J7fs8zxiwxetRoUpYWwEHAGmAOsJYdKyWB+kBtoDJQDagI7Kb3agKlgBL6/FrgC2Al8CPwOfAesJk/oZRO8VhNgfHAAb733wB6A4vydE27AQ01nmOAekAloAxQAygb45gbgKXAa7qeN4F1fwYFKJGSBzhKNyWb/C9weTFdx+5SvKZAI6AOUFe/SwELgW+l8OuBAmCbXu8iL1FayvMXYD9gf70fJGuBucBE4Dkd779WASoBi+VaAbbLSr4GmssarRQA5wOTUhh7KU14M2BvoDpQDlgFfCn3vR34QWNZr5/fQx6/iq7pAOAwoLHOV03ncZVhAvAo8PZ/owKMBi7W3+8DJ8varDQDHgcOdt6bBZyliYkq1YCjpVxNFZvfAT4FVmjyiwt37CJ80x4413dNm4BXgMfkGX7/b1CAtsBM/b0AOCTLZ3sC9ysWWxkC3BDyXE2A7rr55YB3ZXHvycVv2gH3ryXQAzgJqKWQsQn4ABgjZfhTK8A8WThyk/NCxOoHZD1WVgHnAK9n+E4bhY32wFZZ2TRhjjU7yX0sB3QGzhQeqixleAe4UWPeKaVkgu9e60z+P0JMPsAvspjGsmBkOTMVRysFfKcm8Bnwd6AjcAnwr51o8gE2As8CpwLdBAw3AK2AJ4ERykD+NB5gX01KWeAroEHMPPlUYLATS9dqop9O8RqPADoIhyzJ4709VkZyuDzXl8B9wFM7kwKU6typc5zvjZEVA/RS/I8ji4CHFTcPFMDrLKtfINSeRP4KXKqU8FCgPPCNLDYpf1IG+C3LZ76Q9RdICfbWeFoILO8UPEKcENAFOF1/T5brSyJbgNuB45Q+lgX+phh/UwKyqg8wysEZ28RDnJhwvB1ECE0GKoTMktoCU3VtJyjkdf8jKkBp4G79/RtwdYpjWawbdQWGlt0XuEUpY7MYx6sgL1UfOFLH3lOhKy7iXyUA2hI4HnhR5FEuWSHs01c4aD+FglF/NAW4TYNH6dvnxTCmEZq0qXrdCvg/oenqEY7zILBc462mY5aTa44jdRWaVgj3rBK+mBXhGBOAdsBHTvicouxop1eAJgI1AB8DQ4txXN8IC3QUcGsEXAVMBy4KeYy1UoJflZc/DfRLkD2s0O+ysnpr+e9FPM4yeTQLdDspg6q3s2cB05WLozg2PU9jLKPJP19Aag2GSn5YBFA2qQxU1eQlJYoOpGhB6zt5lrhgdRBws/7epMwhr3Ry2CzgPE0CwFjg3jyOcTumrDxOr/cGdpUyNpc7/SVLfr5GADCprAN+1qSvx5SSB+MxoXHkdR2vk/BVDwHMlTuTB6iEKYVWAX7CFEd+2oG4pRlwIYYhbASslhU9lOdxVBH3sSGFY3UDnnGyoqMcoqxYJUyKNUQXC3DdDp58FM8/UAYyFNhLqVYvKcb8LKFkd0wxp56uqbzuwWZhhp/lTRaGyBbSZCLHa+InCmPMwhS6Fu5oD3AEMNtxV8cU83iqYSpuYV3gIUqlWjmTcpcyiV99n+0BDFAsDyNfi4yaCbycgOyKIhcK21juolFxE0a5MMAEpT5gaNvVxXwDRirl+05sWS75DnhElmLZtpYKD1/px8pSEU0Lge/1sxrTL2Bp7F3wWsMqKty1x3Q0nY1pFlmcBXMklQ/lkdro/IdjKOwd4gGuBO7R33cAA/NgAW51cSGmuvZxBOLndll6gdKtKZhGjVz9AWX0/T2UORyMoY7rYKqc+zif3SorHeqkhmGlJoYOtu1pyzCFLb88I1yAPFq/fCtATeXfu4lMaZASkg4j/YFhzutHZIFbQ36/ufiK5vIQi4CXFF9/izGeXTFM4v/IC1bV++sdRfghgoe7zHm9WUTVNwH8zAK8IlkX4Pl8EkHDHKKjXx4nH0xpuRqGZrVx8SfCc+fzgDMEXnfBFF+ulVX9NcZ4bKdPLxnGmZg6RUWlxov0vzD3uo2Ot0jj3KrJDUp9z3Zej1b4yYsCnOic/DlZTj6yEbdT6AcMC9hW1lEew50Px+s9zCVjMWziTH3nMEyHzghMTSCObBFiP1rHXqRsYhSmSXSfLN/tiqlNfCcl2CCMcgHBncofOdxLdXnCvCjAXY7mX5Mnqz8F+EQu1pU3ZHXXyF1egen9G0a49u5v9J1zFdIqYCqNMzHMYhKZqpRykF4frgk9NcPnV0iB6khpaiodnaf3g+Re4FX9fZrCULEqwNVO3Lk9BsiJKzdiKNURPk9g5W5MLWKSYnB/eacmERi3rnKlP4g7eFiTeEDCsd+CocY3K4P4J6bq55f3dN5pYhHr6XO9QtwbKzcVZxpYS4i0jBB4tzxNfj9MT6C92LezEC/jZRG15E4vU1ydFSJf3ipFeFWT3lBKd5ascU4WS8wlyzC9ju2Vip4oDPVKAJ54WlnJI8ATIY69SuNrrlC2Jk2W0M0CnnRifyfghTxM/l5ygTWkfKeGHbfCxo1KG7dKke6LcO4rlN6WcybnEvEQSeQJhRk0nr4p3Kd9xGPsIoXYP4GyBoaA453JfypPkw9wpyZ/s9i2sPK7wkEHucW1AojviggKI/fJDb/gpHuPiYxpkOCazlG6Z5UsDbe9Eq/8XgtvHUZqHuBdpUvbpF35iP0dFA/XK6UCU2K+UFoeRQ6T5R6EoXCfFIn1fcjvt8cUk/b14Y4kIHisAzRPFzZIIrsp1Oyl7OOgtDzA6Zp8dBPyBfwG6PebSnd+kSdaKWAVRd6XEvSSq+yD6VYKe5NmYDp+bvAB4tXE7yG8wOEy7hQ2SCK/4lU8G0YIlzkVwAV7T+dp8gcJvCFgd68uaqyDdj+h8LrCXLIR0zOwTp5sLtGraUPEzM128u8XZb1VYlxnd6WtdUmnh2KsSCIwlHcqCtDOeb06D5Pf0LH+6XLXNs5dKC/wndLRuXLFYVmwnvpeAaZ0HUe+wNTju+L1D56KKQ9fEPFYBU4Y6YZprEkiX8lgwCxHq52GAriVrfp5UIB7hWa/cZguvzuurbSqgj7zpk9Rg+RIcRf1hMSzVRNraWI6ZvnMJEzpeJgQdxWlbjMj8A9g6hD36+/rCNdFnE1s40gpzELcxAow3nk9LAMRk5acLtIEETGfZvjcFuX4TeUFmiinnpAFoV8qxfooBIY4SXH5yhyf2yJv1dTJ6duKT7iO8JtN9Jf11id3ZW93TC2jcob/T3c89WlpKMAQvOXcjYG38CpeacoueLTpEuXguWQ+ptmji0DdaZgFGSNlxVZ6Aa3FB9xF7sphgX43IVxX1EJlCudoIithCkzTxZmEAXDX6+8+mNpGJnlQRvk+wautNyl7AtOwUyOpAqxVzPvWSamWkP7KlZvwaOZ+ROvSfR7THTNAeOAyYYZTZCn9lcJNczBFNrH9AdUihr0nRTw9KO6iocLCI2QvBFl+ZbZCyZkZ0rw38FjRujKAQQGftQpQhoRdWpYIWib0a9uRKmnAU8QLJJU9nZx4qqw4qmxWiGrjxPfHFGNLSWnDNq1s8LFsUeQnhZuTMcu/NwpLTNP72dZa3OqASr+0czKjDY6XOjzgs+/g9TYclYYCWNfSE1PqnKv3OimmXovXKhVHjnby4EkJlWmJeIuumMJODU3KoAhp348+5Ywjc+WBBmFW/u4h7PGO3s8Uv6eJBPMb1hTnvhfgNZ1+FXCcr/H2ZGqVlgLgEDOtpM0rBUqGanBxtc0FlhVTCimTlC7W1A0bF+G7G5x8Oul4HtOEPycjaqGxTc5A/tjNMYJSQpfutQqSiRW1TaoHEm3JXE4FcMFIS5EP23RhE+WGo5IiM5x087YY+XSQ7O8wfQ9k+Ex5AcS9fO+vEag7XplFGeJtH2fle6Wr5+GtHuos670u4Nxd8Zpt/Ur9pLDCAwK7EzKc820HXB8ed+Bhl4Z1kHbuh+md/xJTTBkf4VwnU7ivzS74XJlQCTph6vxBoLKveIeVArWzM3in5coyOpJ874CyCgVu2FyAqTS6pe7qYi3jLllr7HiByzHb8KXqAVx5UR7gVg26liz5CQrvlJVNJmvC3nSozPdkOXH3AFgmRcx0Ez9VvN8H0zMwKQD1t9f1tMUUpi4Mee72ykyCuIPrMD0HE+U9m2D6DR52vOd3JFuvuMrxqrGrl1FWB2/BNGx2VbpSQqh1st7fI8QxlgsQXqyLry72LgzTF0dmCORZN3wKRXsGpgnzLJUiPoxpRT84B1nzvD7XKItynqZzLtL9ulDeqHcK17YWb5l5o3wogJXFylX7izuoorz+K8Jz3WMUl++V1bVWOBkakYQ6VixdLvnA+fu2DIi+PqZ+/5tu6CcKLUHeaQimkWRFiJAxDdPNM0avyym+v0U0SjlIViTMZBLtEjZRIOoxIeqKmEUY00O6pHVy/8dg2rSqKG5OFVLOlXZWwjSR5Fo5U8aZ9BFyxVZ2Fa6pp/ONELFkU9WLpaBnOd+p6WRDQ2XpuWSjjnUk3prD1rLghzSOOGLXI1QmJoVfMqEGrhfQaovXp9ZOYOtmIdRc8ilmf6C+GI77UFne22Tv458m62yYI3z0Fn75kqKbUp6oCZzr3MD1CnNt5K7LYcrkr4ttPEPZxcvKlKLIHKVtV+O1dPWUOz8nxv23C3X/EjedTaIApfH66WYpZeyjlKiqCJJFhG9lvk/AaaQsoqWwxoMBee4MhwDpj9c67ZdGeDuK3KYMxq/A1oL8OfssTFVyoENmLVdcX4JX0o4j92Co3hmOJ3pcoLhujBBQjpg1gSQK8AJFGyhHys29pNd1MbuIvUG42vUGTJn2WKVlpZU+zROQ6yz3fJw+/zje+kUypIGNFVaCFlYsdf7OVBO4Q9b1gsLEMmGf8gm95zcKoScpIwBTh1kuUB1GViZlNJMowGGy7goB6LeD8n675q2NrOY6wlHKM+UN+mIqezWVLUx2aNbpZO+KuchJ6W7JEkO/D3EDf3YInhoKTS+HRPN7SaFLZQlle/vy+H5KX0/IcezvfPxDXhWgwJncIJmCWQXzpMNY3Y7psjksQlioJ5rVlYekZGRhAO2kjyJzc8gmvCpotjS2OV5nz7PKFn4QaP07hUvTQWGom3BSJvldZE4rRyGryJOOy6I8C4RtCIm3UlUA+91sQG2bwE1bJ17VUax7NCT6XSHgVUfKVgdD727P8p1BstS1eHX4TGIVIFv6OdhJJ8cIcxwrsLo/hQs7ZfC20qslwmgx4Tqd5wrvuKnqmcqYMi1l++eO8gAbQ1iOlTc0cQPxVhqfJzf3twiAZxZFu5bt8u2LxCu8gNfpcz25t7SxIemgLFyD9Vh3+UitOzDrEeY77zfAUMonKFyVF6cQZYPKG4WZ5jjE01hMtbOx77PjMKX7N/KtAHYLlig9bnconk9wLsz278XtOzhbijFGmKGjruv1kGnaHCnVhwH/KytGcKWIqqCK41cUXpb2pTxEI+GjV7NM/mECgZkA3pHyfpbybSi3P9qZu3kyou/zrQA/ODloFPle4PE0Jy1rLtR/d4xx/NVxz4PxOpnCVixvlXcalsESb1UWcHPI422Qu2+lEGA32Dw7wFv2UYaSrTfxOaWpI533LhYGOz1hJpJIAWxTxT4xvz9RcddNz66SYkVZjDFD7ra5JmmcEHtj5e5JspwbpODPRnThvcQWLpR7/lGxfLRj8e2c8Jfr2FukLPs5gLaClGM2waXlYlcA25lakfgNCVsUuw/F28u/Kqb6+DLh6gLPUHTX0kkOBsgku+XwElc4aW2U9X1HCbC9pOtYKsUcIV5knJjAM3T/L8Xr8cslX4jV7IG3sdUR8jiD860AXzvH2COhJ/pI4OkK573j5Q3ibJB0p8BfezI/t6cZhr7unoFD6Ork5NsjnLuHxv0+hTemnoGpKYzWucvr/HMCFPrcHOd4HFMLedIXrr6O6vWSKIAFHbWdtCeOlHDyXFuMmer8/x+6mVEWQ6513GsP3Xz/jtyn423b/ryjxLWVhu0ua/1XhPNeJdA4Q17xOAoXaZZpgg9VmDtcyn+5k/J1E8P6PNn5/Y1KsVsoI7Ek1esac8XiVoClDlLOtiS7lWJ0e7nHUgEkSFcKPzams2Lktw5InCfLDkvBvqgUbqMm4hMfszZJZFWBWMsPBLRe1uStiej6q8lzVBagfVNKe4bv/lyj96dj6hhuDm/Jpq0a0zqfVwwSm0G5nrKLruuy4lSAjxxyo0GWmzJT8XC6bkpQ2lOHoptRvSaNHuzk+9fgbawURmZiOP5XMZW8l0RAVZGlnKxJm6X4fBmmWrdUHiLK8xCuw9QuRiplnKF0dw+56jvlno9UiLhR7zUUv3CZFP0VjW+4jjtcIPGIHOe/S/f7ZcezjhQgblIcCrAFrxjRJgMfUD+A7bsk4HOP6rNBO5LdrMmxREdlvN1BDwkxzlXyADZXPk8us4/DpJ2MoZ3XiLXrTebH2AXJwcIscyhcIPtGY70fU/+/QanhfY5yLdb/7lEKOVTp8ZUKEUt0b2ZjKPBKOVLzEzE0uW0rPxCv76BUmgqAg75rENxCZev0m/GepNlBrtmVn5TSdMWr9OEjV9qK5PnRIUXmY1q4wvQUPqWU9VHFxxGYrpxGcpd95UoPJ3N5OZP0VKxvIYV1Sa1NsuKHNdGLKVrtG6Qw8Lzv3O/Ju54qpehJ0bpIkLykDGqYb4w/4D3zIRUFeM+H2v1i08MyPiQdFDKs5dyUI67v6bhHMBW/AsJtarVF4aOjvFdrDP8+Spa5jqI9A34p5UtP+ypOvyqDuErWPdAXCo/RfRhA4bWL5+rezXO8UhDesr0Xj0WYnwHynvaZjpU0xpvTUoBXHKAWVBS6VHGopON+zslA0b4gd3cUuZc9X4kpF89zKOVnhBv2CgkQ68rd7ibiZoVici5q+wxZUn+8vQ62Ks5fJST/C6ZvcKSMYIAmehqFW+P3FNO4Rfcy057GY+TlJhJu7aPfex7mYxsHyRMmVoDNTqxsQnDTRx/l2ssEgLJdgG3uGBbi3J/rws7Da686RvEuzO4Zvwm41VN8LeGAzGx5eDlnjJ9qgkc7+fx4KeEQpXsf6uZvpGgXkS36/Ii3pcwhAZiplTxokg27h+s4thX9PGBQUgVAqRRyoZlq9ONksXNyHGu03N2BBK+KJUPo2ANvYWs1eZjXCbdj2DJ5nSMUDqrqmEvkwfwgdqwmfQZeJbGFjw3dIMB3DV6r2VAf5dtMGch2pXAjBODm4z2cq5TGYN35Zwnnai6Few97pKEA/3LSwTOyfC7s49Rvdn43DfmdjQI5zeRKyynlegfT0FkpxDHekoVYKztAVlw1Awl2vEDlEinaan3elUOdGD444DrLKew8LfLpaIHEocpOBmNqGrP1uTRkAt4KqU1pKMAmJ307NsKkkcVbTPUBw7DyoVDu+XjVyrOEU8JyB3foGkYprK3KEAZOkNKdhtcaNlCpXyuxjIMcLOTHRicrlXUfv/emk0k0lLWuJf1nNdiQubVkSgd0e/PT2GK2t4BUYwtWIspjCiP2u7soH59BuDUL8zUGy3PsjylhDxS5VKBU6yZlAaMUesbL5b8t5rG6lMDdMvYQJ4u5Ha+1zg0fgzWGfXTMWSlO/iFSrt+AT9JSgHlOftqC5MWhVRReRh3HAn6S1bdzrPg4udgRRFuPeBWmJDxEfERZpYxTFTosCdND413mgMU6vmONUjr4DpmfJN5XnmsNuVvaokoPKek6YFzJFA9sV91sJ3vDZliZ6HACQwLcaFh5TUh7iC8zWZ6BuwiSd/T7WUwpt6lSuM54ext2UThsrczCrkc8X0qHQKFdz9BKaaG/obSOE+9vIt2ntDV0wtWrwJQ0FWC2XN1WuZk0nnBxq4MD7if+3n+/C5Xv77jTfTC8+UxyP0lsnKy2m1LV+RTdiMrueNZL5xkqhnS5JrSpM7EDdb86CAf09mGQ0vIsD6Rs/UOcrOb+NHgAv0wTkVIvJS9gQ8BkJ2aOSHCs5Zi6xdl4+wS1xRRMRma5H9vI/dicpQ54tYzet1KGuXgLVEdoko9SmPtFEz1DfMFZTthJU7rg9Tj8p4k0bQV4V0i8nsifRikd9xS89uc+8jRJdvR4WgDNBa+XCXGfkuC4r+l3d7w+/ePxGk6nULi8+4SA7ovCJ5YIuw9vv6C0ZJCDjf6DqdJWAEtblpMHuCHF456O1xjZTtZ8aILj/SpA1BZvBVNFTJ/AU8R7pPv7iq0XiMS5UWGmtMJGUBPnj5jaxChngoakPCd9pWgbFVZXFKcCLFQaVlox88KI398PU7psHvC/Pnh75deUZd1F5pUzYcQ+l8gtQnWX+z474rFmYWoBlTGUsiV/XhQGyPSQh+p429beSPjH0IWRfRVOSopnGO7+szgUwAKZuY47qxUhTi0UwfK+jlMiwMPYpg2Eyj8WVtg1wZhv1ThtqKmAqVu8TbTNJK8XcK2q+H4x2fcktrigtgBp2sDvFrzO7SJsYnEpgEXDyJWGIXNux9DK7hq3AQQ3ZnymSRkgcNZQ51ioi4y7a9bXctNH4u052Ernuyfk/bI9Eg/qxo/J8fm2eBR6/5Tn4BSHT3mcgD6H4lSAjzALJy0Bk2tv4C8zvJ/t0bHDRGrYVLGucu258iADBMLqEG0HjTmYBhd3P6ErFZ9zlapnSukvpXB5twXB/X1hFrHGkbJ4C20KyLCfQdht4pLIeEfDu5N9Q8clFH2MW0e8J29kk1rCCGfjLZTYJjdcVqzahxh6d7Ver3PSQfvYeP9jXA/GsJzuwyted3BCWLkP0/07BUMrb8YUgK5XzK9PUVo4idyJ12Tah8Iri/KqACUw69lsStiGzNz2QB8C/logJsqja3fF7B3YQeloY8JVA618qOzFv1jjUswaftdr3oS3/28uGYz3DMBV4h5se9bFIUJFFGmBt2XPbLLs8JoPBbDIfoFc4zZM2TbItVcUi7gFQ6uuJdkzjMrqZjRVXG8ghnI3ZQ4b9bNF1vcxptQ7B2/7FlcqKJZ2cd5bKfJmTojxHCJv4nq558heRo8jbzqT3hqPyt5hCoAGZDeJXC+g9hn5lxLyEmUwFbHNRH84dhuFshq+ibyAwjuRZ5JzMOXkt/GeJpKW9HYyieHkeChGPhUATPHE0robMY0UH/PHlZsp3Lm0XRPw0A4aT2UZVVWFmfrk2MewZJ4HaAEQGLbwAzJvMRNXOmliWpBgA8UIOXYtB9OUxLS1Lcd7FF8+xe1g6k+IfY9L7oBBTnBiaGkxcT1TOnZFTM/9ILnkWYRYHhXyuNWzcAdtxB/87KSj72K4/nJ5uq/HO/dxEiG3z98RCgCmNdp91MlDeHX1JNJPVv+GJqY80Z496EoTTKv5y0oXc3Xl/BPTCDPKee9vApfn5eGe3iNg+zOGHWVnVgCbSx+Ix3ufrzx835jHsztw/qpYWF4u8ADi7aB1CaaWYZtGDvCh/yCxGKCuk4aVxbCU85SWFoe4z2MairdaeKdWAARYauOt+2uIWVPfJ8axFmOqeLUxzF8DhweIUyOwaZTbzRy2Rv+lAG53vL2UmmHqF3enfA8PwmMT52Modf4oCoDy/bYU7n0bodz1gIjH6olp26qoNG8shoZeFyPNC+plqEc0SnmceIexPiVaQ+4CUVgZHkNBdyoFsHK74q51nS0x1PA9EV14b7nEpphS9MIYY/kW09VreQMwFHFLcj+T0C/bNI6meNvgVMYshZuO6SaOK+fjsYkPY+oQf1gFQJxASwrTq1di2Lk+Ia3vJ31/QYJxLFXoaKOQtAxvu7gwUlrK3AVvQ4v5CksuMdMes93rtTHG+Be8NQUFxFw7sLMpgAtqmuHtz2uXc6/GVLUq5Gkcs0SmHES4Qs1pmPUCmzDV0E4UZQaHY2oTU5z3hkrRopSx73K8Rz9iNpHsrAoApihzEKaevcZxnXfIau6JgRHiyDYyd/JYXDBEXmoChuItpXh8UYbvFGDKyu3wdlvbF1PGfprcK5RPco49A29d5J9KAaw8IXarF96uW+XkSj/DNIj2JsFeeTGkAYZp+1DhYiAe6/icxntviOO8hulncHslzpKCZFrKVpPCS+auTnIh+a4FpCEdpQztKcyyFWDqDB/pZwHp9NaVwdC9rZStHJshn5+sWL445nlqi3hq7UttrxdY3CDybBweKzmEhI23f0QFsFJNbrSjJiVoIcqnAl/fCk8sVUq4HlMFLI23ecWucr17K/TUUKxuKEAYlIl8Lu5hlOPKk0o3zDpGtyt5q0KRq/BvkXvjqD+1ArhSHbNDSWNZamuyr0/cKIuqTPiO4t8xFbZPML11L8ZMMcN6nZF4HdB+WYbZHKPg/xUgWMoLUdeVp6ir2FlNilEKQ9GWl2WXxtC4GzFcegGmGeUT/fyoFHVRnq+jrvDFSRr3bwKJl+NtFZtI/j0AAidoDE85DU8AAAAASUVORK5CYII=');
        background-position: 75% 20%;
        background-size: 28%;
        background-repeat: no-repeat;

        &:after {
            content: '';
            display: block;
            width: 100%;
            height: 20rpx;
            background: #fff;
        }
    }

    &-item {
        height: 280rpx;
        overflow: hidden;
        &-hover {
            opacity: .7;
        }
    }

    &-card {
        &-wrap {
            width: 100%;
            display: flex;
            flex-wrap: nowrap;
        }

        &-image {
            flex: .9;
            align-items: center;
            padding: 20rpx;

            image {
                width: 100%;
                border-radius: 5rpx;
            }
        }

        &-desc {
            flex: 3.3;
            padding: 15rpx 20rpx 20rpx 0;
            overflow: hidden;
        }
        &-name {
            font-size: 30rpx;
            line-height: 40rpx;
            color: #777;
            font-weight: 500;
        }
        &-expired {
            font-size: 24rpx;
            color: #777;
            height: 60rpx;
            line-height: 60rpx;
        }
    }

    &-info {
        display: flex;
        margin-top: 10rpx;
        // align-items: baseline;

        & > div:nth-child(1) {
            flex: 1;
            display: flex;
        }

        & > div:nth-child(2) {
            flex: 1;
            font-size: 22rpx;
            color: #777;
            text-align: right;
        }
    }

    &-price {
        font-size: 40rpx;
        font-weight: 500;
    }

    &-tag {
        margin-top: 5rpx;
        padding-left: 20rpx;
    }

    &-other {
        &-btn {
            float: right;
            width: 120rpx;
            height: 50rpx;
            text-align: center;
            color: RGBA(255, 255, 255, .7);
            line-height: 50rpx;
            font-weight: 300;
            font-size: 24rpx;
            border-radius: 3px;
        }
    }

    &-title {
        margin: 0 20rpx;
        height: 70rpx;
        line-height: 70rpx;
        color: #777;
        border-top: 1px dashed #eee;
        overflow: hidden;
        font-size: 30rpx;

        span {
            float: right;
            font-size: 24rpx;
        }
    }
}
</style>

<script>
import couponTag from './couponTag';

export default {
    components: {
        couponTag,
    },

    props: {
        id: {
            type: Number,
            default: 0
        },
        status: {
            type: Number,
            default: 0,
        },
        image: {
            type: String,
        },
        title: {
            type: String,
        },
        name: {
            type: String,
        },
        distance: {
            type: String,
            default: '',
        },
        type: {
            type: Number,
            default: 1,
        },
        value: {
            type: Number,
            default: 0.00,
        },
        longitude: {
            type: Number,
        },
        latitude: {
            type: Number,
        },
        category: {
            type: String,
            default: 'normal',
        },
        start_at: {
            type: String,
        },
        end_at: {
            type: String,
        },
    },

    data: () => ({
        isTouched: false,
    }),

    computed: {
        text: function () {
            return this.category === 'normal' ? '立即使用' : (
                this.category === 'used' ? '立即点评' : (
                    this.category === 'waitPay' ? '去支付' :'查看详情'
                )
            );
        },
        fontColor: function () {
            return this.category !== 'expired' ? '#f43' : '#999';
        },
        btnColor: function () {
            return this.category !== 'expired' ? '#f43' : '#aaa';
        }
    },

    methods: {
        handleClick() {
            let url = `/pages/coupon/detail?id=${this.id}`;
            if (this.status === 0) {
                url = `/pages/coupon/order?id=${this.id}`;
            }
            wx.navigateTo({ url });
        },
        handleTouchStart(e) {
            this.isTouched = true;
        },
        handleTouchEnd() {
            this.isTouched = false;
        },
        showMap() {
            wx.openLocation({
                latitude: this.latitude,
                longitude: this.longitude,
                scale: 17,
                name: this.name,
            });
        },
    }
}
</script>
