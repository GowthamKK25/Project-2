{
 "cells": [
  {
   "cell_type": "code",
   "execution_count": 1,
   "metadata": {},
   "outputs": [],
   "source": [
    "import pandas as pd\n",
    "import numpy as np\n",
    "from sqlalchemy import create_engine\n",
    "from datetime import datetime\n",
    "import time"
   ]
  },
  {
   "cell_type": "code",
   "execution_count": 2,
   "metadata": {},
   "outputs": [
    {
     "data": {
      "text/html": [
       "<div>\n",
       "<style scoped>\n",
       "    .dataframe tbody tr th:only-of-type {\n",
       "        vertical-align: middle;\n",
       "    }\n",
       "\n",
       "    .dataframe tbody tr th {\n",
       "        vertical-align: top;\n",
       "    }\n",
       "\n",
       "    .dataframe thead th {\n",
       "        text-align: right;\n",
       "    }\n",
       "</style>\n",
       "<table border=\"1\" class=\"dataframe\">\n",
       "  <thead>\n",
       "    <tr style=\"text-align: right;\">\n",
       "      <th></th>\n",
       "      <th>date</th>\n",
       "      <th>open</th>\n",
       "      <th>high</th>\n",
       "      <th>low</th>\n",
       "      <th>close</th>\n",
       "      <th>volume</th>\n",
       "      <th>Name</th>\n",
       "    </tr>\n",
       "  </thead>\n",
       "  <tbody>\n",
       "    <tr>\n",
       "      <th>0</th>\n",
       "      <td>2013-02-08</td>\n",
       "      <td>15.07</td>\n",
       "      <td>15.12</td>\n",
       "      <td>14.63</td>\n",
       "      <td>14.75</td>\n",
       "      <td>8407500</td>\n",
       "      <td>AAL</td>\n",
       "    </tr>\n",
       "    <tr>\n",
       "      <th>1</th>\n",
       "      <td>2013-02-11</td>\n",
       "      <td>14.89</td>\n",
       "      <td>15.01</td>\n",
       "      <td>14.26</td>\n",
       "      <td>14.46</td>\n",
       "      <td>8882000</td>\n",
       "      <td>AAL</td>\n",
       "    </tr>\n",
       "    <tr>\n",
       "      <th>2</th>\n",
       "      <td>2013-02-12</td>\n",
       "      <td>14.45</td>\n",
       "      <td>14.51</td>\n",
       "      <td>14.10</td>\n",
       "      <td>14.27</td>\n",
       "      <td>8126000</td>\n",
       "      <td>AAL</td>\n",
       "    </tr>\n",
       "    <tr>\n",
       "      <th>3</th>\n",
       "      <td>2013-02-13</td>\n",
       "      <td>14.30</td>\n",
       "      <td>14.94</td>\n",
       "      <td>14.25</td>\n",
       "      <td>14.66</td>\n",
       "      <td>10259500</td>\n",
       "      <td>AAL</td>\n",
       "    </tr>\n",
       "    <tr>\n",
       "      <th>4</th>\n",
       "      <td>2013-02-14</td>\n",
       "      <td>14.94</td>\n",
       "      <td>14.96</td>\n",
       "      <td>13.16</td>\n",
       "      <td>13.99</td>\n",
       "      <td>31879900</td>\n",
       "      <td>AAL</td>\n",
       "    </tr>\n",
       "  </tbody>\n",
       "</table>\n",
       "</div>"
      ],
      "text/plain": [
       "         date   open   high    low  close    volume Name\n",
       "0  2013-02-08  15.07  15.12  14.63  14.75   8407500  AAL\n",
       "1  2013-02-11  14.89  15.01  14.26  14.46   8882000  AAL\n",
       "2  2013-02-12  14.45  14.51  14.10  14.27   8126000  AAL\n",
       "3  2013-02-13  14.30  14.94  14.25  14.66  10259500  AAL\n",
       "4  2013-02-14  14.94  14.96  13.16  13.99  31879900  AAL"
      ]
     },
     "execution_count": 2,
     "metadata": {},
     "output_type": "execute_result"
    }
   ],
   "source": [
    "main_df = pd.read_csv(\"Resources/all_stocks_5yr.csv\")\n",
    "main_df = main_df.dropna()\n",
    "main_df.head()"
   ]
  },
  {
   "cell_type": "code",
   "execution_count": 4,
   "metadata": {},
   "outputs": [],
   "source": [
    "# Create table for stocks\n",
    "show_df = main_df[[\"date\", \"open\", \"high\", \"low\", \"close\", \"volume\", \"Name\"]]\n",
    "show_df = show_df.drop_duplicates()\n",
    "show_df.to_csv('Resources/stocks.csv', index=False)"
   ]
  }
 ],
 "metadata": {
  "kernelspec": {
   "display_name": "Python 3",
   "language": "python",
   "name": "python3"
  },
  "language_info": {
   "codemirror_mode": {
    "name": "ipython",
    "version": 3
   },
   "file_extension": ".py",
   "mimetype": "text/x-python",
   "name": "python",
   "nbconvert_exporter": "python",
   "pygments_lexer": "ipython3",
   "version": "3.8.5"
  }
 },
 "nbformat": 4,
 "nbformat_minor": 4
}
